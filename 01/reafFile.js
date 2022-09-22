//导入fs模块
const fs = require('fs')

//调用方法读取文件
fs.readFile('./files/1.txt','utf-8', function (err,dataStr) { 
    //打印失败的结果
    
    console.log(err)  //当读取成功时，err为null。所以可以通过err是都为null判断是否读取文件成功
    if(err){
        return console.log('读取文件失败' +  err.message)
    }
    //成功的操作
    console.log(dataStr)

 })