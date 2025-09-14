var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('我是users根目录文件');
});

// 添加新的路由
router.get('/xxx', function(req, res, next) {
  res.send('我是users/xxx 的文件');
});

module.exports = router;
