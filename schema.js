const Joi = require('joi');
module.exports.listingSchema = Joi.object({
    listing:Joi.object({
        description:Joi.string().required(),
        title:Joi.string().required(),
        country:Joi.string().required(),
        location:Joi.string().required(),
        price:Joi.number().min(0).required(),
        image:Joi.string().allow("",null),
        category:Joi.string().required(),
    }).required(),
});
module.exports.reviewsSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
})