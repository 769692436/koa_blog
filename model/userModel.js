const {db} = require("../database/connect"); //得到数据库的操控对象
const UserSchema = require("../Schema/UserSchema"); //得到user表数据的规范
const objUser = db.model("users", UserSchema); //操控users表的对象

module.exports = objUser; //导出能操控user表的对象
