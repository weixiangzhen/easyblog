const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

const router = require('./router');

app.use('/public/' , express.static(path.join(__dirname , './public')));

app.engine('html' , require('express-art-template'));
//修改默认的views
app.set('views' , path.join(__dirname , './views'));

// 配置解析表单的post请求
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  // 配置加密字符串，在原有加密基础上加上这个字符串
  secret: 'wxz',
  resave: false,
  saveUninitialized: false
  // cookie: { secure: true }
}));

app.use(router);


app.listen(3000 , ()=>{console.log('服务器已经启动');});