const mongoose = require('mongoose')
const Joi = require('joi-browser')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

function ValidateUser (user){
    const schema = {
        username: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(2).required(),
        c_password:Joi.string()
       
    }

    return Joi.validate(user, schema)
}
const UserModel = mongoose.model('user',userSchema)

module.exports.ValidateUser = ValidateUser
module.exports.UserModel= UserModel