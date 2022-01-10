const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const cors = require('cors')
const _ = require('lodash')
const {UserModel, ValidateUser} = require('../models/user')


router.post('/', async (req, res)=>{
    const {error} = ValidateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    

    let getUser = await UserModel.findOne({email:req.body.email})
    if(getUser) return res.status(400).send('User already exist')

    let newUser = new UserModel({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })
    
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)

   try{
    const saveUser = await newUser.save()
    const pickUserData = _.pick(saveUser, ['username', 'email'])
    res.json({success:true, userData:{...pickUserData}})
   }catch(ex){
        console.log('something went wrong while saving to database');
   }
    // res.send('ok we are all set')
})



module.exports = router