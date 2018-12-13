//得到Schema对象
const {Schema} = require("../database/connect");

//声明 ObjectId
const ObjectId = Schema.Types.ObjectId;

const articleSchema = new Schema({
    title : String, //标题
    tips : String, //文章分类
    content : String, //文章内容
    author : {
        type : ObjectId,
        ref : "users"  //关联users表
    } //作者
}, {
    versionKey : false,
    timestamps : {
        createdAt : "createTime"
    }
});

//导出
module.exports = articleSchema;
