const yup = require("yup");

const addProperty = yup.object({
title:yup.string().required("title is required"),

description:yup.string().required("description is required"),

propertyType:yup.string().required( "propertyType is required ")
. oneOf(["Apartment", "House", "Villa", "Cabin", "Studio"] , "invalid property type"),

location:yup.object({
country: yup.string().required("Country is required"),
city:yup.string().required("City is required"),
address:yup.string().required("Address is required"),
}).required("location is required"),

amenities: yup.array().of(yup.string()),

images:yup.array().of(yup.string()),

available: yup.boolean(),


})
module.exports = addProperty;