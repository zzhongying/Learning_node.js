//导入定义验证规则的包
const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

//定义用户验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

//定义验证登录注册表单数据的规则
exports.reg_login_schema = {
    body:{
      username,
       password, 
    },

}

//导出用户更新的验证模块
exports.update_userinfo_schema = {
    body:{
        id:id,
        nickname:nickname,
        email:email,    
       
    },
}