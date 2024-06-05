var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const UserRouter = require('./routes/admin/UserRouter.js')
const NewsRouter = require('./routes/admin/NewsRouter.js')
const webNewsRouter = require('./routes/web/NewsRouter.js')
const ProductRouter = require('./routes/admin/ProductRouter.js')
const webProductRouter = require('./routes/web/ProductRouter.js')
const JWT=require("./util/JWT.js")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(webNewsRouter);
app.use(webProductRouter);
app.use((req,res,next)=>{
  if(req.path==="/adminapi/user/login") {
    next();
    return ;
  }
  const token=req.headers["authorization"].split(" ")[1];
  if(token){
    var payload=JWT.verify(token);
    if(payload){
        const newToken=JWT.generate({
          _id:payload._id,
          UserName:payload.UserName,
        },"30s");
        res.header("authorization",newToken);
        next();
    }else{
        res.status(401).send({errCode:401,errInfo:"登录已过期或未登录",})
    }
}
});

app.use(UserRouter);
app.use(NewsRouter);
app.use(ProductRouter);

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
