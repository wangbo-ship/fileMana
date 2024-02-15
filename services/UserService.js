const UserModel = require("../model/UserModel")

const UserService = {
    addUser:(username,password,age,avatar)=>{
        //模型的create()方法操作数据库添加
        //插入数据库 创建模型user，限制filed类型 一一对应数据库的集合users
        return UserModel.create({
            username,password,age,avatar
        })
    },
    updateUser:(_id,username,password,age)=>{
        return UserModel.updateOne({_id},{
          username,password,age
        })
    },
    deleteUser:(id)=>{
        return UserModel.deleteOne({
            _id:id
        })
    },
    getUser:()=>{
        return UserModel.find({},["username","age","avatar"]).sort({age:1})
        // .skip((page-1)*limit)
        // .limit(limit)
    },
    // 登录部分
    login:(username,password)=>{
        return UserModel.find({username,password})
    }
}

module.exports = UserService