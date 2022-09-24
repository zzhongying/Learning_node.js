//导入express

const express = require('express')

//创建web服务器
const app = express()

//监听请求
app.get('/user',(req,res)=>{
    //res.send()方法向客户端响应一个JSON对象
    res.send({name:'111',age:20})
    //返回query阐述
   console.log(req.query())
   res.send(req.query)
})

app.post('/user',(req,res)=>{
    res.send('请求成功')
})

app.get('/user/:id',(req,res)=>{   //user/zy，返回的是zy
    //req.params默认是一个空对象
    // 里面存放着通过:动态匹配到的参数值
    console.log(req.params)  //动态匹配到的url参数
    res.send(req.params)
})

//启动web服务器
app.listen(80,()=>{
    console.log('Server running at 127.0.0.1:80')
})

