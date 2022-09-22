//导入http模块
const http = require('http')

//创建一个服务器实例
const server = http.createServer()

//为服务器实例绑定request事件，监听客户端请求
// server.on('request',(req,res)=>{
//     const url = req.url
//     const methods = req.method
//     const str = `Your request url is ${url}, and request method is ${methods} 这是`
//     console.log(str)

//     //为了解决中文乱码问题，需要设置响应头
//     res.setHeader('Content-Type','text/html;charset=utf-8')

//     //res是响应对象，它包含了与服务器相关的数据和属性
//     res.end(str)
// })


//动态响应内容
server.on('request',(req,res)=>{
    //1.获取请求的url地址
    const url = req.url

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