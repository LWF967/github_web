var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("../db/db.js");

var TestApi = require('../api/testApi')
/* GET  listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function (req, res) {
  db.query('select * from person', function (err, rows) {
    console.log(rows);
    if (err) {
      res.render('persons', {title: '人员管理', datas: []});  // this renders "views/persons.html"
    } else {

      res.render('persons', {title: '人员管理', datas: rows});
    }
  })
});
router.post('/login',TestApi.login);
// 注册功能
router.post('/register',TestApi.register);


module.exports = router;
