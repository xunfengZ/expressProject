var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    index:0
  });
});

module.exports = router;




//res.render(file,option)  file是模板文件省略后缀，option是一个对象
