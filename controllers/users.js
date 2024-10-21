const User=require("../models/user");
module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.signup=async (req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registerdUser=await User.register(newUser,password);
        console.log(registerdUser);
        // added login in signup -> because after signup user again has to login to add listing so to avoid it we added it
        req.login(registerdUser,(err)=>{
            if(err){
                 return next(err);
            }
                req.flash("success","Welcome to Wanderlust...");
                res.redirect("/listings");
        })
    }
     catch(er){
        req.flash("error",er.message);
        res.redirect("/signup");
     }                  
}
module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}
module.exports.login=async(req,res)=>{
    req.flash("success","Welcome  back to Wanderlust...");
    if(res.locals.redirectUrl){
      res.redirect(res.locals.redirectUrl);
    }
    else{
      res.redirect("/listings");
    }
}
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        else{
            req.flash("success","Logged out..");
            res.redirect("/listings");
        }
    })
}