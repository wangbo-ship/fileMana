// 利用mongoose对象连接数据库
const mongoose = require("mongoose")

// 插入集合和数据，数据库StuMana会自动创建
mongoose.connect("mongodb://127.0.0.1:27017/mystumana")

//mongodb的bin下： mongod --dbpath=D:\mongodb\data\db
