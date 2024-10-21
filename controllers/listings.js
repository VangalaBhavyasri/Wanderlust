const Listing=require("../models/listing");
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapToken=process.env.MAP_TOKEN;
// const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const {listingSchema}=require("../schema.js");
module.exports.index=async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}
module.exports.newlisting=(req,res)=>{
    res.render("listings/new.ejs");
}
module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested does not exist...");
        res.redirect("/listings");
    }
    console.log(listing.owner);
    res.render("listings/show.ejs",{listing});
}
module.exports.showiconslistings=async(req,res)=>{
    let {category}=req.params;
    try{
        const allListings=await Listing.find({category:category});
        res.render("listings/index.ejs",{allListings});
    }
    catch(error){
        next(error);
    } 
}
module.exports.createListing=async(req,res,next)=>{
    // let response=await geocodingClient.forwardGeocode({
    //     query: req.body.listing.location,
    //     limit: 1
    //   })
    //     .send();
    // // console.log("response "+response.body.features[0].geometry);
    // res.send("done!");
    let url=req.file.path;
    let filename=req.file.filename;
    let {error}=listingSchema.validate(req.body);
    // console.log("result is:"+error);
if(error){
next(error);
}
else{
const newListing=new Listing(req.body.listing);
newListing.owner=req.user._id;
newListing.image={url,filename};
// newListing.geometry=response.body.features[0].geometry;
await newListing.save();
req.flash("success","new listing added successfully....");
res.redirect("/listings");  
}   
} 
module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(listing){
        let originalImagelUrl=listing.image.url;
        originalImagelUrl=originalImagelUrl.replace("/upload","/upload/h_300,w_250");
        res.render("listings/edit.ejs",{listing,originalImagelUrl});
    }
    else{
        req.flash("error","Listing you requested does not exist....");
        res.redirect("/listings");
    }
}
module.exports.updateForm=async (req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        next(error);
    }
let {id}=req.params;
let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
if(typeof req.file !="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
}
req.flash("success","Listing updated successfully...");
res.redirect(`/listings/${id}`);
}
module.exports.deleteForm=async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    req.flash("success","Deleted successfully...");
    // console.log(deletedListing);
    res.redirect("/listings");
}