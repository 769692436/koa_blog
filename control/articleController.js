const User = require('../module/articleModel');

exports.addPage = async (ctx) => {
  await ctx.render('add-article',{
    session: ctx.session,
    title: '文章发表'
  })
}
