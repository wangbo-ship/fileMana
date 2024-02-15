const UserService = require("../services/UserService")

const UserController = {
    addUser:async (req,res)=>{
        console.log(req.file)
        const {username,password,age} = req.body
        //交给service层处理数据库逻辑
        const avatar = req.file? `/uploads/${req.file.filename}` : `/images/default.png`
        await UserService.addUser(username,password,age,avatar)
        res.send({
            ok:"创建成功"
        })
    },
    updateUser:async (req,res)=>{
        //注意区分post请求中的body和params
        // console.log(req.body,req.params.id)
        const {username,password,age} = req.body
        await UserService.updateUser(req.params.id,username,password,age)
        res.send({
            ok:"修改成功"
        })
    },
    deleteUser:async (req,res)=>{
        //调用deleteOne方法删除数据库数据
        await UserService.deleteUser(req.params.id)
        res.send({
            ok:"删除成功"
        })
    },
    getUser:async (req,res)=>{
        //sort({age:1})按照年龄正序排 倒序则-1
        // skip跳过几个 和limit限制要几个 进行分页
        const {page,limit} = req.query
        let users = await UserService.getUser()
        res.send(users)
    },

    // 登录部分
    login:async (req,res)=>{
        const {username,password} = req.body
        const data = await UserService.login(username,password)
        if(data.length===0){
            res.send({ok:0})
        }else{
            // 设置session 挂载一个字段设置有效信息进行标记 默认存在内存中
            req.session.user = data[0] 
            res.send({ok:1})
        }
    },

    logout:(req,res)=>{
        req.session.destroy(()=>{
            res.send({ok:1})
        })
    }
};

module.exports = UserController;
