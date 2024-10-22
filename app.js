if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const Listing=require("./models/listing");
const path=require("path");
const ejsMate=require("ejs-mate");
const expressError=require("./utils/expressError.js");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const session = require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const MongoStore = require('connect-mongo');
app.set("viewengine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine('ejs',ejsMate);  
const dbUrl=process.env.ATLASDB_URL;
main().then(()=>{
    console.log("Connected to the database");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(dbUrl)
}
const store= MongoStore.create({
    mongoUrl:dbUrl,
    touchAfter:24*60*60,
    crypto: {
        secret:process.env.SECRET_CODE,
    },
})
store.on("error",()=>{
    console.log("error occured in mongo session store",error);
})
const sessionOptions={
    store,
    secret:process.env.SECRET_CODE,
    resave:false,
    saveUnintialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.newUser=req.user;
    next();
})
// app.get("/demouser",async (req,res)=>{
//     let fakeUser=new User({
//         email:"bhavya@gmail.com",
//         username:"bhavyasri",
//     });
//     let registerdUser= await User.register(fakeUser,"mona@6");
//     res.send(registerdUser);
// })
//Home route
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);
app.use("/search",async (req, res) => {
    try {
        const searchQuery = req.body.searchQuery;
        const listing = await Listing.findOne({ title: { $regex: new RegExp(searchQuery, 'i') }}).populate({path:"reviews",populate:{path:"author"}}).populate("owner");;
        if(listing && searchQuery.length>0){
            res.render("listings/show.ejs",{listing});
        }
        else{
            req.flash("error","Oops, try for another location..");
            res.redirect("/listings");
        }
    }
    catch (err) {
        console.error(err);
        req.flash("error","Error while searching..")
      }
})
app.all("*",(req,res,next)=>{
    next(new expressError(404,"Page not found!.."));
})
app.use((err,req,res,next)=>{
    let {statuscode=500,message="Something went wrong.."}=err;
     res.status(statuscode).render("listings/error.ejs",{err});
})
app.listen(8080,()=>{
    console.log("Listening to the port 8080...");
})







