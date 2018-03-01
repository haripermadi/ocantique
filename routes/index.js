const express = require('express');
const app = express();
const router = express.Router()
const bcrypt = require('bcrypt');
const models = require('../models')
const Op = require('sequelize').Op
const user = models.User

router.get('/',(req, res)=> {
  let session = req.session.isLogin
  models.Product.findAll().then(data=>{
    console.log('session index',req.session)
      res.render('index',{product:data,session:session})
  }).catch(err=>{
      res.send(err)
  })
})
router.get('/search',(req, res)=> {
  models.Product.findAll({
    where :{
      name :{
        [Op.iLike] : `%${req.query.search}%`
      }
    }
  }).then(data=>{
     res.render('index',{product:data})
  }).catch(err=>{
      res.send(err)
  })
})

router.get('/category',(req, res)=> {
  models.Product.findAll({
    include:[{model:models.Category,where:{name :{[Op.iLike] : `%${req.query.category}%`}}}],
  }).then(data=>{
    // res.send(data)
     res.render('index',{product:data})
  }).catch(err=>{
      res.send(err)
  })
})

router.get('/detailProduct/:id',(req, res)=> {
  let session = req.session.isLogin
  models.Product.findById(req.params.id).then(data=>{
      // res.send(data)
      res.render('users/detailProduk',{product:data,session:session})
  }).catch(err=>{
      res.send(err)
  })
})
router.get('/login',(req, res)=> {
  let session = req.session.isLogin
  res.render('users/login',{error:null,session:session})
})

router.post('/login',(req, res)=> {
  // console.log("======",req.body)
  let obj = {
    email:req.body.email,
    password: req.body.password
  }
  user.findOne({
    where:{email:obj.email}
  }).then(data=>{
    
    bcrypt.compare(obj.password, data.password).then(function(result) {
      // res == true
      if(obj.email === data.email && data.role === 1 && result){
        req.session.isLogin = true
        req.session.type = data.role
        req.session.UserId = data.id
        console.log("id user",data.id)
        console.log(req.session)
        if(data.role === 1){
          // res.redirect('/user/${data.id}')
          res.redirect(`/`)
        }else{
          res.redirect('/admin')
        }
      }else{
        res.send('Email dan password salah!')
      }
    })  
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/register',(req, res)=> {
  let session = req.session.isLogin
    res.render('users/register',{error:null,session:session})
})

router.post('/register',(req, res)=> {
  let session = req.session.isLogin
    if(req.body.password != req.body.retype_password){
        err = 'Verifikasi password tidak sesuai dengan password !!'
        res.render('users/register',{error:err,session:session})
    }else{
        user.create({
            first_name :req.body.first_name,
            last_name :req.body.last_name,
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phone,
            address:req.body.address,
            role:1
        }).then(()=>{
            res.redirect('/login')
        }).catch(err=>{
            res.render('users/register', {error:err.errors[0].message,session:session})
        })
    }

})

router.get('/logout',function(req,res){
  let session = req.session.isLogin
  console.log("before log out",req.session)
  req.session.destroy(function(err){
    if(!err){
      let out = 'You have logged out!'
      // res.send(out)
			res.redirect('/login')
    }else{
      res.send(err)
    }
  })
  console.log("log out",req.session)
})

module.exports = router
