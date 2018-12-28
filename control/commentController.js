const Comment = require('../module/commentModel');
const Article = require("../module/articleModel");

exports.publish = async (ctx) => {
  //用户没登录，提示请登录
  if (ctx.session.isNew) {
      //没登录
      return ctx.body = {
          status: 0,
          msg: "请登录"
      };
  }

  //用户已经登录
  //取出发过来的数据
  let data = ctx.request.body;
  data.author = ctx.session.userId; //得到作者

  //插入数据
  let objComment = new Comment(data);
  await objComment
      .save()
      .then(data => {
          ctx.body = {
              status: 1,
              msg: "评论成功"
          };
          //更新当前评论的文章的评论数目
          Article
              .update({_id : data.article}, { $inc : { commentNum : 1 }})
              .then(data => {
                  console.log("评论数增1成功");
              }, err => console.log("评论数增1失败"));
      }, err => {
          ctx.body = {
              status: 0,
              msg: "评论失败"
          };
      });
}
