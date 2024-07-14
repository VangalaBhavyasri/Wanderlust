const mongoose=require("mongoose");
const Schema= mongoose.Schema;
const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://unsplash.com/photos/a-small-cabin-in-the-woods-with-a-metal-roof-JlSR07gAA5M",
        set:(v)=>v===""?"https://unsplash.com/photos/a-small-cabin-in-the-woods-with-a-metal-roof-JlSR07gAA5M":v,
    },
    price:{
        type:Number,
    },
    location:String,
    country:String
})
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;