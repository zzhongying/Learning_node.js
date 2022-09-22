const path = require("path");

//注意 ../会抵消一层路径

const pathstr = path.join('/a','/b/c','../','./d','e')
console.log(pathstr)  //输出 \a\b\d\e

//使用path.basename可以获取路径中的文件名

const fpath = '/a/b/c/d/index.html'
const fullname = path.basename(fpath)
console.log(fullname)  //index.html

const namewithoutExt = path.basename(fpath,'.html')
console.log(namewithoutExt);  //index，无扩展名

const extname = path.extname(fpath)
console.log(extname)  //.html