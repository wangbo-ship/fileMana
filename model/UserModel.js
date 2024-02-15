const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UserType = {
    username:String,
    password:String,
    age:Number,
    avatar:String
}

//利用mongoose创建一个user模型 模型user将会对应users集合（集合会自动加一个s） 
// Schema(UserType)限制集合的域（字段）的类型
        
// 1.创建模型user，限制filed类型 一一对应数据库的集合users
const UserModel = mongoose.model("user",new Schema(UserType)) 

module.exports = UserModel
