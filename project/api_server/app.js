const express = require('express')
const userRouter = require('./router/user')
const cors = require('cors')

const app  = express()


//配置解析表单数据的中间件,只能解析application/x-www-form-urlencoded格式的表单数据,必须放在userRouter前面
app.use(express.urlencoded({extended:false}))

//配置跨域中间件
app.use(cors())
app.use('/api',userRouter)


app.listen(3007,function () {
    console.log('api server running at http://127.0.0.1:3007')
  })