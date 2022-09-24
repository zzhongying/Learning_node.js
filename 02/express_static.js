
const express = require('express')

const app = express()

//提供静态资源
app.use(express.static('../images'))

app.listen(80,(req,res)=>{
    console.log('express server running at 127.0.0.1')
})