//得到Schema对象
const {Schema} = require("../database/connect");

//设置规范
const userSchema = new Schema({
    username : String,
    password : String,
    avatar : {
        type : String,
        default : "/avatar/img1.jpg"
    }
}, {versionKey : false});

//导出
module.exports = userSchema;
