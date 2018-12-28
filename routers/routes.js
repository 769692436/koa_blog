const Router = require('koa-router');
const router = new Router;

const user = require('../control/userController');
const article = require('../control/articleController');
const comment = require('../control/commentController');

router.get('/', user.keepLogin, article.list);

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
//退出登录
router.get('/user/logout', user.logout);
//发布文章
router.get('/article/add', user.keepLogin, article.addPage);
//提交文章内容
router.post('/article/add', user.keepLogin, article.add);
//处理文章列表路由
router.get('/page/:id', article.list);
//文章详情页
router.get('/article/:id', article.detail);
//发表评论
router.post('/comment', comment.publish);

module.exports = router;
