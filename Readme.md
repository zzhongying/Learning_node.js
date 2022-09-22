# 一：node中的模块
Node中根据模块来源不同，将模块分为了3大类，分别是：
- 内置模块：由Node.js官方提供，例如fs,path,http等
- 自定义模块：用户创建的每个.js文件，都是自定义模块
- 第三方模块，使用前需要下载
## 1. fs文件系统模块

### 1.1 文件读写
fs模块是官方提供的用来操作文件的模块。提供了一系列的方法和属性，用于满足用户对文件的操作需求。例：
- `fs.readFile()` 读取指定文件中的内容  `fs.readFile(path[,options], callback)`  中括号表示可选参数
- `fs.writeFile()` 向指定文件写入内容  `fs.writeFile(file, data[,options], callback)`

**路径的动态拼接：**
在使用fs模块操作文件时，如果提供的操作路径是以./或者../开头的相对路径时，容易出现路径动态拼接错误的问题。
- 原因：代码在运行时，会以执行node命令时所处的目录，动态拼接出被操作文件的完整路径
- 解决方式：使用__dirname`fs.writeFile(__dirname +  '/files/2.txt','abcd',function(err){})`


## 2. path路径模块
path模块是Node.js官方提供的，用来处理路径的模块。提供了一系列的方法和属性，用来满足用户对路径的处理需求
- `path.join()`方法，用于将多个路径片段拼接成一个完整的路径字符串。尽量使用`path.join`代替'+'进行路径拼接
- `path.basename()`方法，用来从路径字符串中，将文件名解析出来。`path.basename(fpath,'.html')`，输出不含扩展名的文件名
- `path.extname()`方法，获取文件的扩展名

## 3. http模块
http模块是官方提供的、用来创建web服务器的模块。创建一个web服务器的基本步骤包括：
1. 导入http模块
2. 创建web服务器实例
3. 为服务器实例绑定request事件，监听客户端的请求
4. 启动服务器
``` js
//导入http模块
const http = require('http')

//创建一个服务器实例
const server = http.createServer()

//为服务器实例绑定request事件，监听客户端请求,动态响应内容
server.on('request',(req,res)=>{
    //1.获取请求的url地址
    const url = req.url
    const methods = req.method
    let content = '<h1>404 not found</h1>'

    if(url === '/' || url ==='/index.html'){
        content = '<h1>首页</h1>'
    }else if( url === '/about.html' ){
        content = '<h1>关于</h1>'
    }

    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.end(content)
})


//启动服务器
server.listen(80, function () { 
    console.log('server running at http://127.0.0.1:80');
 })
```
