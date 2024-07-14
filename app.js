const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const methodOverride=require("method-override");
const path=require("path");
const ejsMate=require("ejs-mate");
app.set("viewengine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine('ejs',ejsMate);  
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("Connected to the database");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL)
}
//Home route
app.get("/",(req,res)=>{
    res.send("Home page...");
})
// Index route
app.get("/listings",async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
})
//new listing route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})
//Show route
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    // console.log(listing);
    res.render("listings/show.ejs",{listing});
})
//create route
app.post("/listings",async (req,res)=>{
    let {title,description,image,price,location,country}=req.body;
    let newListing=new Listing({
        title:title,
        description:description,
        image:image,
        price:price,
        location:location,
        country:country,
    })
    await newListing.save();
    res.redirect("/listings");
})
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
//Update route.
app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body});
    res.redirect(`/listings/${id}`);
})
//Delete route
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})
// app.get("/testlisting",async (req,res)=>{
// let sampleListing=new Listing({
//     title:"Tree house",
//     description:"Dream house of every one",
//     price:1200,
//     location:"Telangana",
//     country:"India",
// })
// await sampleListing.save();
// console.log("Data uploaded");
// res.send(sampleListing);
// })
app.listen(8080,()=>{
    console.log("Listening to the port 8080...");
})