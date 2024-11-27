const joi= require('joi')

exports.signInSchema=joi.object({
    email:joi.string().min(8).max(16).required().email(),
    password:joi.string().required().min(5).max(8).message("invalid password length")
})