const Listing=require("./models/listing.js");
const Review=require("./models/review.js");
const {reviewsSchema}=require("./schema.js");
module.exports.isLoggedin=(req,res,next)=>{
    console.log(req.path+".."+req.originalUrl);
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be  Logged in..");
       return res.redirect("/login");
    }
    next();
}
module.exports.saveredirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!res.locals.newUser._id.equals(listing.owner._id)){
        req.flash("error","You are not the owner of this listing.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.isauthor=async (req,res,next)=>{
    let {id,reviewId}=req.params;
    const review=await Review.findById(reviewId);
    if(!res.locals.newUser._id.equals(review.author._id)){
        req.flash("error","You can't delete this review..");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewsSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}