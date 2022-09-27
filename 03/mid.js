const express = require('express')
const app = express()

const mw1 = function (req,res,next) {
    console.log('mid1')
    //
    const time = Date.now()
    req.startTime = time
    //把流转关系转交给下一个中间件或路由
    next()
}
const mw2 = function (req,res,next) {
    console.log('mid2')
    //
    const time = Date.now()
    req.startTime = time
    //把流转关系转交给下一个中间件或路由
    next()
}

app.use(mw2)  //全局注册中间件
app.use(mw1)  //全局注册中间件


app.get('/',(req,res)=>{
    res.send('Home page:' + req.startTime)
})

app.get('/user',(req,res)=>{
    res.send('user page:' + req.startTime)
})

app.listen(80,()=>{
    console.log('127.0.0.1')
})


