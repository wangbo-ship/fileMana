var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var uploadRouter = require('./routes/uploader');

//引入session利用cookie存sessionid来鉴权 express-session 默认情况下将会话数据存储在内存中
var session = require("express-session");
//可以使用 connect-mongo 模块来将会话数据存储到 MongoDB 中
const MongoStore = require('connect-mongo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));  //
app.set('view engine', 'ejs');

// 进入路由之前注册的中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name:"wbsystem",
  secret:"wbsyd", //按照密钥进行加密 可以随意写
  cookie:{
    maxAge:1000*60*10, //过期时间
    secure:false,  // 若true则只有在https才可以访问cookie
  },
  resave:true,  // 设置seesion时重新设置过期时间
  saveUninitialized:false, //需要在用户登录时立即创建 Session那么可以将saveUninitialized设为true。如果应用在用户登录后才会设置 Session 数据，设置为false
  //设置mongo-connect
  store:MongoStore.create({
    mongoUrl:'mongodb://127.0.0.1:27017/mystumana-session',  //新创建一个数据库用来保存session 这样服务器重启不超过过期时间session不会丢失
    ttl:1000*60*10
  })
}))
// 权限校验
app.use((req,res,next)=>{
  if(req.url.includes("login")){
    next()
    return
  }
  if(req.session.user){
    //访问所有接口都重新设置session 达到访问接口就重新刷新过期时间的效果 （原先只在登录的controller里面设置了session 也就是只有登录才能刷新过期时间）
    req.session.mydate = Date.now()  
    next() //session对象中存在标记的user字段就放行进入下面的路由中间件
  }else{
    // res.redirect("/login")
    // 若session无效 则 是接口就返回错误码 不是接口就重定向
    req.url.includes("api") ? res.status(401).json({ok:0}) : res.redirect("/login")
  }
})
//注册中间件 转路由
// app.use('/', indexRouter);
app.use('/login',loginRouter);
app.use('/api', usersRouter);
app.use('/upload',uploadRouter);
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
