const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    filename:{
        type:String
    },
    text:{
        type:String,
        required:true
    }
})

const PostModel = mongoose.model('post', schema)

module.exports.PostModel = PostModel
