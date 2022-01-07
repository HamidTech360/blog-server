const express = require('express')
const router = express.Router()
const multer = require('multer')
const {createPost} = require('../controllers/upload')


const upload = multer({dest:"./uploads/"})



router.post('/create',upload.single('file'), createPost)

// router.post('/', upload.single('file'), async(req, res)=>{

//     const fileType = req.file.mimetype.split("/")[1]
//     const rename = `${req.file.filename}.${fileType}`
//     console.log(rename);
//     fs.rename(`./uploads/${req.file.filename}`, `./uploads/${rename}`, function(){
//         //res.send('uploaded successfully')
//         response.imgUploaded = true
//     })

//     const newPost = new PostModel({
//         filename:rename,
//         text:req.body.text
//     })

//     const savePost = await newPost.save()
//     if(savePost){
//         response.textUploaded = true
//         res.json(response)
//     }
    
// })



module.exports = router