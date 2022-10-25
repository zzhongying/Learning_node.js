//创建mysql连接
const mysql = require('mysql')


const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'project_exercise'
})

module.exports = db