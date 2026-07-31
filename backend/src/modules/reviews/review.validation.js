const yup = require("yup");

const addReview = yup.object({

rating:yup.number().required("rating is required").min(1,"min rating is 1").max(5,"max rating is 5"),

comment:yup.string().required("comment is required"),

user:yup.string().required("user is required").matches(/^[0-9a-fA-F]{24}$/, "invalid user id"),

property:yup.string().required("property is required").matches(/^[0-9a-fA-F]{24}$/, "invalid user id"),

})

module.exports = addReview;