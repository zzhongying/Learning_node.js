//用户路由模块
const express = require('express')
//导入用户路由处理函数
const user_Handler = require('../router_handler/user')

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
//导入需要验证规则对象
const { reg_login_schema} = require('../schema/user')


const router = express.Router()

//注册新用户,并调用规则检验中间件进行合法新验证
router.post('/regust',expressJoi(reg_login_schema) ,user_Handler.regUser)

//登录
router.post('/login', expressJoi(reg_login_schema),user_Handler.logUser)

module.exports = router