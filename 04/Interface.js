const express = require('express')

const router = require('./apiRouter')
const app = express()


app.use('/api',router)



app.listen(80,()=>{
    console.log('express server running at 127.0.0.1:80')
})
