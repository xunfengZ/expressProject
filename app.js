var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var proRouter = require('./routes/pro');
var userRouter = require('./routes/user');
var orderRouter = require('./routes/order');
var cartRouter = require('./routes/cart');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
//引入cookie-parser文件
var cookieParser=require('cookie-parser')

//引入session文件
var session=require('express-session')
var app = express();
// view engine setup

// //使用cookieParser
//   app.use(cookieParser());

//使用session
app.use(session({
  //session 加密信息
  secret:'ddddddd',
  //强制保存 官方建议false
  resave:false,
   //初始化session 存储 true
   saveUninitialized: true,
   //设置过期时间
   cookie:{maxAge:1000*10*60}
}))



// // cookie的路由守卫
// app.all('*',(req,res,next)=>{
//   console.log('进入路由守卫');
//   // console.log(req.cookies);
//   // console.log(req.url);
//   //限制用户登录的页面
//   if(req.cookies.islogin==='ok'||req.url==='/login'||req.url==='/login/in'||req.url==='/register'){
//        next()
//   }else{
//     console.log('非法闯入，返回登录页面');
//     res.redirect('/login')
//   }

//   if(req.cookies.islogin==='ok'){  //如果已经是登录状态
//           //在登录状态下访问登录或注册页面，强制返回首页
//           if(req.url==='/login'||req.url==='/login/in'||req.url==='/register'){
//             console.log('强制返回首页');
//             res.redirect('/')
//           }
//   }
// })



//session的路由守卫
app.all('*',(req,res,next)=>{
  console.log('进入session路由守卫');
  console.log(req.session);
  if(req.session.isLogin==='OK'||req.url==='/login'||req.url==='/login/in'||req.url==='/register'){
    next() //继续下一步操作
  }else{
    //若不是以上页面，则直接返回到登录
    res.redirect('/login')
    console.log('非法闯入！');
  }
  //若已经是登录状态
  if(req.session.isLogin==='OK'){
    //在登录状态下跳到以下页面，强制跳转回首页
    if(req.url==='/login'||req.url==='/login/in'||req.url==='register'){
      res.redirect('/')
    }
  }
  
})


 
app.set('views', path.join(__dirname, 'views'));
//使用模板 引擎ejs
app.set('view engine', 'ejs');
// dev的时候会处理logger日志
app.use(logger('dev'));
// 使用express的json模块 可以接收和处理现在最常用方便的JSON数据 脚手架已经配好
app.use(express.json());
//xtended: false：表示使用系统模块querystring来处理，也是官方推荐的  
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//以下是路由表的use  必须先命中第一个路由表  才能进入后面的indexRouter 等 注意！

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pro', proRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
// app.use('/login',loginRouter)
app.use('/login',loginRouter)
app.use('/register',registerRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
