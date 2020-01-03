var createError = require('http-errors');
var express = require('express'); //加载express模块
var path = require('path'); //路径模块
var cookieParser = require('cookie-parser'); //解析cookie工具，通过req.cookies可以取到传过来的cookie,并转换为对象
var bodyParser = require('body-parser'); //处理JSON,Raw,Text，URl编码数据
var logger = require('morgan');

//路由信息（接口地址），存放routes的根目录
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//载入中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
//配置路由，（'自定义路径'，'上面设置的路径'）
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler，错误处理
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler，错误处理
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
