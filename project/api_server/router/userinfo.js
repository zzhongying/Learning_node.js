const express = require('express')

const router = express.Router()

//导入验证数据的中间件爱你
const expressJoi = require('../router_handler/userinfo')
//用户信息更新的验证规则
const {reg_login_schema} = require('../schema/user')

//挂载路由
router.get('/userinfo',(req,res)=>{  //获取用户基本信息路由模块
    res.send('ok')
})


//导入路由处理函数
const userinfo_handler = require('../router_handler/userinfo')
const expressJoi = require('@escook/express-joi')

//获取用户基本信息模块
router.get('/userinof',userinfo_handler.getUserInfo)
//更新用户信息模块
router.post('/userinof',expressJoi(reg_login_schema),userinfo_handler.updateUserInfo)



module.exports = router
