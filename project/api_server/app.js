const express = require('express')
const joi = require('joi')
const userRouter = require('./router/user')
const userinfoRouter = require('./router/userinfo')
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

//解析token文件的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
//使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api/]}))



//配置跨域中间件
app.use(cors())
//导入并使用用户路由模块
app.use('/api',userRouter)
//导入并使用用户信息路由模块
app.use('/my',userinfoRouter)   


//定义全局错误级别的中间件，当当个路由下的错误没有被捕获时，由全局捕获错误
app.use((err,req,res,next)=>{
  //验证失败导致的错误
  if(err instanceof joi.ValidationError) return res.cc(err)
  //未知的错误
 
  //捕获身份认证失败的错误
  if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
 
 
  res.cc(err)


})


app.listen(3007,function () {
    console.log('api server running at http://127.0.0.1:3007')
  })