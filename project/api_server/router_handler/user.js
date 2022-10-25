//定义路由处理方法，供router模块进行调用

const { use } = require("../router/user")
const db = require('../db/index')
const bcrypt = require('bcryptjs')  //引入密码加密模块

//注册新用户
exports.regUser = (req,res)=>{
    //拿到客户端提交的用户信息
    const userinfo = req.body
   
    //对表单数据进行合法性判断
    if(!userinfo.username || !userinfo.password){
        console
        return res.send({status:1,message:'用户名或密码不合法'})
    }

    //定义SQL语句，查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr,userinfo.username,(err,results)=>{
        //执行SQL语句失败
        if(err){
            return res.send({status:1,message:err.message})
        }

        //判断用户名是否被占用，SQL是查询语句，results必然是一个数组
        if(results.length>0){
            return res.send({status:1,message: '用户名已经存在！'})
        }

        //TODO：用户名可用，对输入的密码进行加密
        console.log(userinfo)
        userinfo.password = bcrypt.hashSync(userinfo.password,10)
        console.log(userinfo)

        //定义插入新用户的sql语句
        const sql = 'insert into ev_users set ?'
        db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
            if(err){
                return res.send({status:1,message:err.message})
            }
            
            //判断影响行数是否为1
            if(results.affectedRows !== 1) return res.send({status:1,message:'注册用户失败，请稍后再试！'})

            //注册用户成功
            res.send({status:0,message:'注册用户成功！'})
        })
    })

  
}

//用户登录
exports.logUser = (req,res)=>{
    res.send('login OK')
}

