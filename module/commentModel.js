const {db} = require("../database/connect"); //得到数据库的操控对象
const CommentSchema = require("../Schema/commentSchema"); //得到comments表数据的规范
const objComment = db.model("comments", CommentSchema);///操控comments表的对象

module.exports = objComment; //导出能操控user表的对象
