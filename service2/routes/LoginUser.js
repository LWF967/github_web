let express = require('express');
let router = express.Router();
//————————————连接数据库——————————
//记得装mysql依赖啊
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',//数据库用户名
  password : 'root',//密码
  database : 'master_express'//数据库名
});

connection.connect((err)=>{
  if(err){
    console.log(err)
  }else{
    console.log("数据库连接成功")
  }

});
//获取客户端数据
router.get('/', function(req, response, next) {
  // 把从客户端传来的名字，密码赋值到新的变量
  let name = req.query.userName
  let pwd = req.query.userPassword
  // 通过名字查询数据库用户表得到密码  password是数据表字段名，表名user_info
  connection.query("SELECT userPwd FROM user WHERE userName = '" + name + "'", function (err, res, fields) {
    // 当没有查找到密码时
    if (err) {
      throw err
      return;
    } else {
      if (res.length > 0) {
        //将数据库传来的数据转化为JSON格式
        let uPasswordString = JSON.stringify(res);
        let userPassword = JSON.parse(uPasswordString)[0].password;
        if (userPassword == pwd) {
          //将数据库的密码userPassword 和服务端 传来的密码相等
          response.send({statusCode: 200, msg: '登录成功'})
          return
        } else {
          response.send({statusCode: 0, msg: '密码不正确'})
          return
        }
      }
    }
    //如果没有数据，说明用户名填写错误
    response.send({statusCode: 0, msg: '用户名不正确'})
  });
});
  module.exports = router;
