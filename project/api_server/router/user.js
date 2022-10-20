//用户路由模块
const express = require('express')
//导入用户路由处理函数
const user_Handler = require('../router_handler/user')

const router = express.Router()

//注册新用户
router.post('/regust', user_Handler.regUser)

//登录
router.post('/login', user_Handler.logUser)

module.exports = router