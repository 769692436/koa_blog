const { Schema } = require('../database/connect');

const ObjectId = Schema.Types.ObjectId;

const commentSchema = new Schema({
  content : String, //评论内容
  author : {  //用户自己的id值
      type : ObjectId,
      ref : "users"  //关联users表
  }, //作者
  article : { //文章id
      type : ObjectId,
      ref : "articles"  //关联articles表
  }
}, {
  versionKey : false,
  timestamps : {
      createdAt : "createTime"
  }
})


module.exports = commentSchema;
