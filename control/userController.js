const User = require('../model/userModel');
const crypto = require('../utils/encrypt.js');

exports.reg = async (ctx) => {
  console.log(ctx.request.body);
  let { username, password } = ctx.request.body;
  console.log(username);
  await new Promise((res, rej) => {
    User.find({ username }, (err, data) => {
      if(err) return rej(err);
      if(data.length !== 0) return res("");
      const userObj = new User({
        username,
        password: crypto(password)
      });

      userObj.save((err, data) => {
        if(err){
          rej(err);
        }else{
          res("save successfully")
        }
      })
    });
  }).then(data => {
    if(data){
      ctx.body = {status: 'reg_success', url: '/user/login'};
    }else{
      ctx.body = {status: 'reg_failed', url: '/user/reg'};
    }
  }, err => {
    ctx.body = {status: 'reg_error', url: '/user/reg'};
  });
}

exports.login = async (ctx) => {
  console.log(ctx.request.body);
  let { username, password } = ctx.request.body;
  await new Promise((res, rej) => {
    User.find({ username }, (err, data) => {
      if(err) rej(err);
      if(data.length === 0) return rej(0);

      if(data[0].password === crypto(password)) {
        return res(data);
      }else{
        return res("");
      }
    });
  }).then(data => {
    if(data){
      ctx.body = {status: 'login_success', url: '/'};
      ctx.cookies.set('username', username, {
        domain: 'localhost',
        path: '/',
        maxAge: 1000*60*60*8,
        httpOnly: true,
        overwrite: false
      });
      ctx.cookies.set("userId", data[0]._id, {
          //配置cookie的属性
          domain: "localhost",
          path: "/",
          maxAge: 1000 * 60 * 60,
          httpOnly: true, //不让客户端操控这条cookie
          overwrite: false
      });
      //设置后台的session内的字段
      ctx.session = {
          username,
          userId: data[0]._id,
          avatar : data[0].avatar  //取到用户头像
      };
    }else{
      ctx.body = {status: 'password_error', url: '/user/login'};
    }
  }, err => {
    if(err === 0){
      ctx.body = {status: 'user_no_exist', url: '/user/login'};
    }else{
      ctx.body = {status: 'login_error', url: '/user/login'};
    }
  });
}
