var express = require('express');
var router = express.Router();

//渲染登录页面
router.get('/',(req,res,next)=>{    
    res.render('login',{title:'Express'});
})

module.exports = router