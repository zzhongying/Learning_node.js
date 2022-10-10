const express = require('express')
const app = express()

const mw1 = function (req,res,next) {
    console.log('mid1')
    //
    const time = Date.now()
    req.startTime = time
    //把流转关系转交给下一个中间件或路由
    // throw new Error('服务器内部发生问题')
    next()
}
//错误级别的中间件
const mw2 = function (err,req,res,next) {
    console.log('发生了错误' + err.message)
    console.log('mid2')
    const time = Date.now()
    req.startTime = time
    //把流转关系转交给下一个中间件或路由
   
    next()
}

//局部生效的中间件，不会影响其他路由,使用数组传递和使用逗号分隔都可以
app.get('/user', mw1,mw2, (req,res)=>{
    res.send('user page:' + req.startTime)
})


app.get('/',[mw1,mw2],(req,res)=>{
    res.send('Home page:' + req.startTime)
})

app.listen(80,()=>{
    console.log('127.0.0.1')
})

