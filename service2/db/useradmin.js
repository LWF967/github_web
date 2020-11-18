
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




//查
router.get('/getUserList', (req, res) => {
  const sqlStr = 'SELECT * FROM user'
  pool.query(sqlStr, (error, results) => {
    if (error) return res.json({
      code: 404,
      message: error
    })
    res.json({
      code: 200,
      message: results,
      affextedRows: results.affextedRows
    })
  })
})
//条件查找
router.get('/getUserListById/:id', (req, res) => {
  const id = req.params.id;
  const sqlStr = 'select * from user where id=?';
  pool.query(sqlStr, id, (err, results) => {
    if (err) return res.json({
      code: 404,
      message: '数据不存在',
      affextedRows: 0
    });
    res.json({
      code: 200,
      message: results,
      affextedRows: results.affextedRows
    });
  })
});
//添加
router.post('/addUser', (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const sex = req.body.sex;
  const address = req.body.address;
  console.log("userName:" + username);
  // const sqlStr = "insert into users(username,sex,address) values('" + username + "','" + sex + "','" + address + "')";
  const sqlStr = "insert into user set ?";
  console.log(sqlStr);
  pool.query(sqlStr, req.body, (err, results) => {
    if (err) return res.json({
      code: 404,
      message: err,
      affectedRows: 0
    });
    res.json({
      code: 200,
      message: '添加成功',
      affectedRows: results.affectedRows
    });
  })
});
//修改
router.post('/updateUser', function (req, res) {
  console.log(req.body);
  const id = req.body.id;
  const username = req.body.username;
  const password = req.body.password;
  const address = req.body.address;
  const sqlStr = "update user set userName='" + username + "',userPwd='" + password + "',myPhoto='" + address + "'where id=" + id;
  console.log(sqlStr);
  pool.query(sqlStr, (err, results) => {
    if (err) return res.json({
      code: 404,
      message: err,
      affectedRows: 0
    });
    res.json({
      code: 200,
      message: '修改成功',
      affectedRows: results.affectedRows
    });
  })
});
//删除
router.delete('/deleteUser/:id', function (req, res) {
  console.log('params:' + req.params);
  let id = req.params.id;
  let sql = 'delete from user where id=' + id;
  pool.query(sql, id, (err, results) => {
    if (err) return res.json({
      code: 404,
      message: err,
      affectedRows: 0
    });
    res.json({
      code: 200,
      message: '删除成功',
      affectedRows: results.affectedRows
    })
  })
});
module.exports = router;
