const express = require('express')
const router = express.Router()

router.get('/user/list',function (req,res) { 
    res.send('Get user List')
 })

 router.post('/user/add',function(req,res){
    res.send('Add new user')
 })

 module.exports = router