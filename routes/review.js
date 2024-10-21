const express=require("express");
const router=express.Router({mergeParams:true});
const {reviewsSchema}=require("../schema.js");
const ExpressError = require("../utils/expressError.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const reviewController=require("../controllers/reviews.js")
const {validateReview,isLoggedin,isauthor}=require("../middleware.js");
router.post("/",isLoggedin,validateReview,wrapAsync(reviewController.createReview));
//review delete post
router.delete("/:reviewId",isLoggedin,isauthor,wrapAsync(reviewController.destroyReview));
module.exports=router;
