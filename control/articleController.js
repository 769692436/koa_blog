const Article = require('../module/articleModel');

exports.addPage = async (ctx) => {
  if (ctx.session.isNew) {
      //没登录
      await ctx.redirect('/');
  }else{
    await ctx.render('add-article',{
      session: ctx.session,
      title: '文章发表'
    });
  }

}

exports.add = async (ctx) => {
  if (ctx.session.isNew) {
      //没登录
      return ctx.body = {
          status: 'no_login',
          msg: "请登录"
      };
  }
  let data = ctx.request.body;
  await new Promise((res, rej) => {
    new Article(data)
        .save((err, data) => {
          if(err) return rej(err);
          res(data);
        });
  }).then(data => {
    ctx.body = {
      status: 'release_success',
      msg: '发布成功！'
    }
  }, err => {
    console.log('release_err---->', err);
    ctx.body = {
      status: 'release_failed',
      msg: '发布失败！'
    }
  });
}

exports.list = async (ctx) => {
  let page = ctx.params.id || 1
  let maxNum = await Article.estimatedDocumentCount((err, data) => {
      if(err) return err;
      return data;
  });

  let artList = await Article
      .find()
      .sort("-createTime")
      .skip((page-1) * 5)  //初始位置，跳过多少条
      .limit(5)  //获取多少条数据
      .populate("author", "_id username avatar")
      .then(data => data, err => {
          console.log("报错")
      });
      console.log("123",artList);
      //渲染页面
    await ctx.render("index", {
        session: ctx.session,
        title : "blog首页",
        artList,
        maxNum  //文章总数目
    });
}
