const express = require('express')

const app = express()
//导入路由模块
const router = require('./rout')


//注册路由模块
app.use(router)

app.listen(80,()=>{
    console.log('server running....')
})