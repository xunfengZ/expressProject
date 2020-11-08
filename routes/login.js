var express=require('express');
var router=express.Router();
var admin=require('../sql/admin');

//主页面
router.get('/',(req,res,next)=>{
    // console.log(1);
    //渲染
    res.render('login',{

    })
})

//跳转
router.post('/in',(req,res,next)=>{
    //获取数据
    let obj=req.body;
    console.log(obj);
    //在数据库中查找数据是否存在
    admin.findOne(obj,(err,data)=>{
        if(err){
            console.log(err);
        }else{
           
            console.log(data);
            if(data){ //存在就跳转到首页   同时记录下cookie
                //cookie的设置
                // res.cookie('islogin','ok')
                //session的设置
                req.session.isLogin='OK'
                res.redirect('/')
            }else{//不存在就跳转到注册
                res.redirect('/register');
            }
        }
    })
})


module.exports=router