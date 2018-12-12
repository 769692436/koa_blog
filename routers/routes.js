const Router = require('koa-router');
const router = new Router;

const user = require('../control/userController');

router.get('/', user.keepLogin, async (ctx, next) => {
  console.log(ctx.session);
  await ctx.render('index', {session: ctx.session});
});

router.get(/^\/user\/(reg|login)/, async (ctx) => {
    //得到布尔值， true显示注册， false显示登录
    const show = /(reg)$/.test(ctx.path);
    // await ctx.render("register", {show : show});
    await ctx.render("regist", {show});
});

//注册
router.post('/user/reg', user.reg);
//登录
router.post('/user/login', user.login);

router.get('/user/logout', user.logout);


module.exports = router;
