const express = require('express')
const router = express.Router()
const {UserModel} = require('../models/user')
const Joi = require('joi-browser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

router.post('/', async(req, res)=>{
    const {error} = Validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await UserModel.findOne({email:req.body.username})
    if(!user) return res.status(400).send('Account Not found. Seems you are not an ADMIN')

    const validPwd = await bcrypt.compare(req.body.password, user.password)
    if(!validPwd) return res.status(403).send('Incorrect password, please check and try again')

    const token = jwt.sign({_id:user._id}, config.get('jwtPrivateKey'))
    res.json({
        authorised:true,
        auth_token:token
    })

})
function Validate (user){
    const schema = {
        username: Joi.string().required(),
        password: Joi.string().required()
    }
    return Joi.validate(user, schema)
}

module.exports = router;