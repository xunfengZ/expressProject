var express = require('express');
var router = express.Router();
var admin=require('../sql/admin');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('user', {
  //   index:2
  // });
  admin.find({},(err,data)=>{
    if(err){
      console.log(err);
    }
    res.render('user',{
      index:2,
      data:data
    })
  })
});


//添加
router.get('/add',(req,res,next)=>{
  res.render('userAdd',{
    index:2
  })
})

router.post('/addAction',(req,res,next)=>{
  let obj=req.body;
  obj.adminId = Number(obj.adminId);
  console.log(obj);
  admin.insertMany(obj,(err,data)=>{
       if(err) {
         console.log(err)
       } 
       console.log(data)
       res.redirect("/user");
  })
})


//删除
router.get('/delete',(req,res,next)=>{
    //获取id
    let id=req.query._id;
    //在数据库中查找 删除
    admin.findOneAndDelete({'_id':id},(err,data)=>{
      if(err){
        console.log(err);
      }
      console.log(data);
      res.redirect('/user')
    })
})

//修改
router.get('/update',(req,res,next)=>{
   //获取id
   let id=req.query._id;
   console.log(id);
   //默认的值再插入到数据库中
   admin.findById({"_id":id},(err,data)=>{
     if(err){
       console.log(err);
     }
     console.log(data);
     res.render('userUpdate',{
       index:2,
       data:data
     })
   })
})

//修改--更新数据
router.post('/updateAction',(req,res,next)=>{
  let obj=req.body;
  admin.findByIdAndUpdate( obj._id,obj,(err,data)=>{
    if(err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");

})
})

//查
router.get('/search',(req,res,next)=>{
    let obj=req.query.search
    // console.log(obj);
    //封装正则表达式
    let reg=new RegExp(obj);
    admin.find({adminName:reg},(err,data)=>{
      if(err){
        console.log(err);
      }
      console.log(data);
      res.render('user',{
        index:2,
        data:data
      })
    })
})







module.exports = router;
