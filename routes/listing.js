const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js"); 
const {listingSchema,reviewsSchema}=require("../schema.js");
const ExpressError = require("../utils/expressError.js");
const Listing=require("../models/listing.js");
const {isLoggedin,isOwner}=require("../middleware.js");
const listingcontrollers=require("../controllers/listings.js");
const multer  = require("multer")
const {storage}=require("../cloudconfig.js");
const upload = multer({storage});
router.route("/")
.get(wrapAsync(listingcontrollers.index))
.post(isLoggedin,upload.single("listing[image]"),
    wrapAsync(listingcontrollers.createListing)
);
// .post((req,res)=>{
//     res.send(req.file);
// })
// router.get("/",wrapAsync(listingcontrollers.index))
//new listing route
router.get("/new",isLoggedin,listingcontrollers.newlisting);
router.route("/:id")
.get(wrapAsync(listingcontrollers.showListing))
.put(isLoggedin,isOwner,upload.single("listing[image]"),// validateListing,
    wrapAsync(listingcontrollers.updateForm))
.delete(isLoggedin,isOwner,wrapAsync(listingcontrollers.deleteForm))
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingcontrollers.renderEditForm))
router.get("/category/:category",listingcontrollers.showiconslistings)
module.exports=router;
//Show route
// router.get("/:id",wrapAsync(listingcontrollers.showListing))
//create route
// router.post("/",isLoggedin,// validateListing,
//     wrapAsync(listingcontrollers.createListing)) 

//Update route.
// router.put("/:id",isLoggedin,isOwner,// validateListing,
//     wrapAsync(listingcontrollers.updateForm));
//Delete route
// router.delete("/:id",isLoggedin,isOwner,wrapAsync(listingcontrollers.deleteForm))
