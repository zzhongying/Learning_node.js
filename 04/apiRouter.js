const  express = require('express')

const router = express.Router()

//挂载对应路由，实现get方法
router.get('/get',(req,res)=>{

    const query = req.query  //获取响应字符串
    res.send({
        status:0,
        msg:'get请求成功',
        data: query,
    })
})


router.post('/post',(req,res)=>{
    const body  = req.body
    res.send({
        status:0,
        msg:'POST请求成功',
        data:body
    })
})

module.exports = router


