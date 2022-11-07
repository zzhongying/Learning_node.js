const express = require('express')
const joi = require('joi')
const userRouter = require('./router/user')
const cors = require('cors')

const app  = express()


//配置解析表单数据的中间件,只能解析application/x-www-form-urlencoded格式的表单数据,必须放在userRouter前面
app.use(express.urlencoded({extended:false}))

//一定要在路由之前封装错误处理函数
app.use((req,res,next)=>{
  //status=1表示默认值为1，失败 
  res.cc = function (err,status=1) {     //全局中间件，为res挂载错误处理函数cc
    res.send({
      status,
      message: err instanceof Error ? err.message :err
    })
  }

  next()
})



//配置跨域中间件
app.use(cors())
app.use('/api',userRouter)

//定义全局错误级别的中间件，当当个路由下的错误没有被捕获时，由全局捕获错误
app.use((err,req,res,next)=>{
  if(err instanceof joi.ValidationError) return res.cc(err)
  //未知的错误
  res.cc(err)
})


app.listen(3007,function () {
    console.log('api server running at http://127.0.0.1:3007')
  })