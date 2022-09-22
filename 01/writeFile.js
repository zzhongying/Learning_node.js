//1.导入文件系统模块

const fs = require('fs')


//绝对路径写法：F:\\技术学习\\learning_node.js\\01\\files\\1.txt
fs.writeFile(__dirname + '/files/2.txt','abcd',function(err){
    if(err){
        return console.log('文件写入失败' + err.message)
    }
    console.log(__dirname)  //文件当前所处的目录，不会随着终端执行node命令的路径改变而改变
    console.log('文件写入成功')
})