var express = require('express');
const UserController = require('../controllers/UserController');
const UserModel = require('../model/UserModel');
var router = express.Router();
//引入multer用于上传
const multer = require('multer');
const upload = multer({dest:'public/uploads/'});  //创建文件夹用于存储文件

/* 渲染表格操作页面 */
router.get('/', function(req, res, next) {
  // 跳转的时候判断一下之前标记的session 不过这只对登录有效 其余无效 所以要写成应用级中间件注册到app.js
  // if(req.session.user){
  //   res.render('index',{title:'Express'});
  // }else{
  //     res.redirect("/")
  // }
  res.render('index',{title:'Express'});
});


//添加接口
router.post("/user",upload.single("avatar"),UserController.addUser)

//修改接口(动态路由获取前端req的id)
router.put("/user/:id",UserController.updateUser)

//删除接口
router.delete("/user/:id",UserController.deleteUser)

// 获取列表接口
router.get("/user",UserController.getUser)

//登录校验
router.post("/login",UserController.login)

//退出登录
router.post("/logout",UserController.logout)

module.exports = router;
