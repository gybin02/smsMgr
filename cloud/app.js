// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});
//路由会对满足“/”的地址，先处理，然后再交给接下去的路由处理
app.get(/^\/*/,function(req, res, next){
  req.user ="shuilan";
  next(); // 将控制转向下一个符合URL的路由
});

app.get('/',function(req,res){
  res.redirect('/login.html');
});

app.post('/login',function(req,res){
  AV.User.logIn(req.body.username, req.body.password).then(function(){
    //登录成功，AV.Cloud.CookieSession 会自动将登录用户信息存储到 cookie
    //跳转到profile页面。
    res.redirect('/message');
  },function(error){
    //登录失败，跳转到登录页面
    res.redirect('/');
  });
});

app.get('/message',function(req,res){
  // 判断用户是否已经登录
  if (req.AV.user) {
    console.error("User Valid")
  }
  res.redirect('dialog.html');
});
app.get('/contact',function(req,res){
  res.redirect('contact.html');
});
app.get('/calllog',function(req,res){
  res.redirect('calllog.html');
});
// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();