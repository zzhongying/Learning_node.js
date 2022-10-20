const express = require('express')

const router = require('./apiRouter')
const app = express()


//解决跨域问题
const cors = require('cors')
app.use(cors())

//挂载路由模块
app.use('/api',router)




app.listen(80,()=>{
    console.log('express server running at 127.0.0.1:80')
})
