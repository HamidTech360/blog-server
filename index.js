const express = require('express')
const app = express()
const config = require('config')
const mongoose = require('mongoose')
const user = require('./routes/user')
const auth = require('./routes/auth')
const upload = require('./routes/upload')
const cors = require('cors')

if(!config.get('jwtPrivateKey')){
    console.error('No Jwt Provided');
    process.exit(1)
}

mongoose.connect('mongodb://localhost/blog')
.then(()=>console.log('connection successfuly established'))
.catch(()=>console.log('Failed to establish connection'))

app.use(cors())
app.use(express.json())
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api/upload', upload)

const port = process.env.port || 3001
app.listen(port, ()=>console.log(`listening to port ${port}`))
