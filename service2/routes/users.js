var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getUser',function(req,res,next){
  var user = new User();
  //解析路由参数
  var params = URL.parse(req.url, true).query;
  if(params.id=='1'){
    user.name='张三';
    user.age=20;
    user.sex='man';
  }else if(params.id=='2'){
    user.name="李四";
    user.age=30;
    user.sex='woman';
  }

  var response = {status:1,data:user}
  res.send(JSON.stringify(response))

});

router.get('/getLwf',function(req,res,next){
  var data = {
    code: 12,
    data: {
      name: 'aaa',
      pwd: '123'
    },
    isSuccess: true,
    msg: "请求成功"
  }
  res.json(data);
});



router.get('/AA', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
