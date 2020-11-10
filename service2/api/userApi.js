var models = require('../db/userDB');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');
const fs = require('fs');

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'master_express'
});
require('../util/util');


//测试接口
//
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function (req, res, next) {
  if(pool) {
    res.json({
      status:'0000',
      msg:'succees'
    });
  } else {
    res.json({
      status:'-1',
      msg:'error!'
    });
  }
});



var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.send('err123');
  } else {
    console.log(ret);
    res.send(ret);
  }
};

var dateStr = function(str) {
  return new Date(str.slice(0,7));
};


//
// //查找用户接口
// router.post('/login', (req, res) => {
//
//   var params = req.body;
//
//   console.log(params);
//   console.log(params.name+'1');
//   if (pool) {
//     let sql = `select * from user where userName=${params.name}`;
//     pool.query("SELECT * from  user WHERE userName= ' "+ params.name+"", (err, result) => {
//       if(err) {
//         res.json({
//           status:'-1',
//           msg:err.message
//         });
//       } else {
//         if(result.length === 0) {
//           res.json({
//             status:'0',// 用户不存在
//             msg:'user not exist'
//           });
//         } else {
//           let checkPw = result[0].userPwd;
//           let myName = result[0].userName;
//           let myId = result[0].userId;
//           if(userPwc != checkPw) {
//             res.json({
//               status:'-2',//密码错误
//               msg:'password error'
//             });
//           } else {
//             res.cookie('userId', myId, {
//               path:'/',
//               maxAge:1000*60*60 // 设置cookie时间
//             });
//             res.cookie('userName', myName, {
//               path:'/',
//               maxAge:1000*60*60 // 设置cookie时间
//             });
//             // req.session.user = result; // 设置session
//             res.json({
//               status:'1',
//               msg:'登录成功!',
//               result:result
//             });
//           }
//         }
//       }
//     });
//   } else {
//     res.json({
//       status:'-1',
//       msg:'error!'
//     });
//   }
// });



router.post('/login', (req, res) => {
  var sql_name = $sql.user.select_name;
  // var sql_password = $sql.user.select_password;
  var params = req.body;
  console.log(params);
  if (params.name) {
    sql_name += "where userName ='"+ params.name +"'";
  }
  models("select * from user where userName='"+ params.name +"'", params.name, function(err, result) {
    if (err) {
      console.log(err+'1');
    }
    // console.log(result);
    if (result[0] === undefined) {
      res.send('-1')   //查询不出username，data 返回-1
    } else {
      var resultArray = result[0];
      console.log(params);
      console.log(params.name);
      console.log(resultArray.userPwd);
      console.log(resultArray.userName);
      // console.log(keywords);
      if(resultArray.userPwd === params.password) {
        jsonWrite(res, result);
      } else {
        res.send('0')   //username
      }
    }
  })
});

// 增加用户接口
router.post('/addUser', (req, res) => {
  var sql = $sql.user.add;
  var params = req.body;
  console.log(params);
  console.log(params.birth);
  models(sql, [params.name, params.account, params.pass, params.checkPass,
    params.email, params.phone, params.card, dateStr(params.birth), params.sex], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});




module.exports = router;
