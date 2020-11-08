var express = require('express');
const { route } = require('.');
var router = express.Router();
var admin=require('../sql/admin');

//默认
router.get('/',(req,res,next)=>{
    res.render('register')
})

//注册后跳转
router.post('/in',(req,res,next)=>{
    let obj=req.body;
    // console.log(obj);
    admin.findOne(obj,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(data);
            if(data){
                //集合中有数据则重新跳转到注册
                // console.log('已有');
                res.redirect('/register')
            }else{  //没有数据则可以注册
                // console.log('可以注册');
                admin.insertMany(obj,(err,data)=>{
                    if(err){
                        console.log(err);
                    }else{
                        if(data){
                            //注册成功
                            res.redirect('/login')
                        }else{
                            res.redirect('/register')
                        }
                    }
                })
            }
        }
    })
})


module.exports=router