//定义路由处理方法，供router模块进行调用

const { use } = require("../router/user")
const db = require('../db/index')
const bcrypt = require('bcryptjs')  //引入密码加密模块
const jwt= require('jsonwebtoken')
const config = require('../config')  //导入全局配置文件

//注册新用户
exports.regUser = (req,res)=>{
    //拿到客户端提交的用户信息
    const userinfo = req.body
   
    //对表单数据进行合法性判断
    // if(!userinfo.username || !userinfo.password){
    //     console
    //     return res.send({status:1,message:'用户名或密码不合法'})
    // }

    //定义SQL语句，查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr,userinfo.username,(err,results)=>{
        //执行SQL语句失败
        if(err){
            // return res.send({status:1,message:err.message})
            return res.cc(err)
        }

        //判断用户名是否被占用，SQL是查询语句，results必然是一个数组
        if(results.length>0){
            // return res.send({status:1,message: '用户名已经存在！'})
            return res.cc('用户名已经存在！')
        }

        //TODO：用户名可用，对输入的密码进行加密
        console.log(userinfo)
        userinfo.password = bcrypt.hashSync(userinfo.password,10)
        console.log(userinfo)

        //定义插入新用户的sql语句
        const sql = 'insert into ev_users set ?'
        db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
            if(err){
                // return res.send({status:1,message:err.message})
                return res.cc(err)
            }
            
            //判断影响行数是否为1
            if(results.affectedRows !== 1) {
                //return res.send({status:1,message:'注册用户失败，请稍后再试！'})
                return res.cc('注册用户失败，请稍后再试！')
            }

            //注册用户成功
            // res.send({status:0,message:'注册用户成功！'})
            return res.cc('注册用户成功！',0)  //注册成功后，将状态变为0
        })
    })

  
}


//用户登录
exports.logUser = (req,res)=>{

    //接收表单数据

    const userinfo = req.body
    //定义SQL语句
    const sql = 'select * from ev_users where usernmae=?'

    //执行SQL语句
    db.query(sql,userinfo.username,(err,results)=>{
        if(err) return res.cc  //执行sql语句失败

        //执行sql成功，但是没有获取到数据
        if(results.length !=1){
            return res.cc('登录失败')
        }

        //判断登录密码，使用`bcrypt.compareSync`（用户提交的密码，数据库中的密码）方法比较密码是否一致
        const compareSync = bcrypt.compareSync(userinfo.password,results[0].password)

        //如果对比结果为fals，则输入密码错误
        if(compareSync === false){
            return res.send('输入密码错误，登录失败')
        }
        //TODO：生成token，核心注意点：在生成token字符串时，一定要剔除密码和头像的值
        
        const user = {...results[0],password:'',user_pic:''} 
        console.log(user)
    
        //对用户信息加密，生成token,参数分别表示加密对象，加密密钥，token有效期
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
        console.log(tokenStr)


        res.send({
            status:0,
            message:'登录成功',
            token: 'Bearer ' + tokenStr,
        })
    })

 
}

