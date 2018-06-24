const express = require('express');
const md5 = require('blueimp-md5');
const User = require('./models/user');

const router = express.Router();

router.get('/',(req , res)=>{
  console.log(req.session.user);
  res.render('index.html',{user:req.session.user});
});

router.get('/login',(req , res)=>{
  res.render('login.html');
});

router.post('/login',(req , res)=>{  
  const body = req.body;

  md5(md5(body.password));
  User.findOne({ email:body.email, password:body.password}, (err , user)=>{
    if(err)
      return res.status(500).json({err_code: 500,success:'服务器繁忙，请稍后重试'});
    // 用户名或密码错误
     if(!user){
      return res.status(200).json({err_code: 1,success:'用户名或密码错误'});
    }
    
    // 登录成功    
    // 使用session记录数据
    req.session.user = user;
    res.status(200).json({err_code: 0,success:'登录成功'});    
  });
});

router.get('/register',(req , res)=>{
  res.render('register.html');
});

router.post('/register',(req , res)=>{
  const body = req.body;

  User.findOne({
    $or: [{email:body.email},
      {nickname:body.nickname}
    ]},(err , data)=>{
    if(err)
      return res.status(500).json({err_code: 500,success:'服务器繁忙，请稍后重试'});
    // 用户名或昵称已经存在
     if(data){
      return res.status(200).json({err_code: 1,success:'用户名或昵称已经存在'});
    }

    md5(md5(body.password));
    // 注册成功
    new User(body).save((err , user)=>{
      if(err)
        return res.status(500).json({err_code: 500,success:'服务器繁忙，请稍后重试'});

      // 使用session记录数据
      req.session.user = user;

      res.status(200).json({err_code: 0,success:'注册成功'});
    });
  });
});

router.get('/logout' , (req , res)=>{
  req.session.user = null;

  res.redirect('/login');
});

module.exports = router;