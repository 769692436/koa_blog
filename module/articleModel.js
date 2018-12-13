const {db} = require("../database/connect"); //得到数据库的操控对象
const ArticleSchema = require("../Schema/articleSchema"); //得到user表数据的规范
const objArticle = db.model("articles", ArticleSchema); //操控users表的对象

module.exports = objArticle; //导出能操控user表的对象
