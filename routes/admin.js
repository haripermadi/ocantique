const express = require('express');
const app = express();
const router = express.Router()
const models = require('../models')
const bcrypt = require('bcrypt')
const user = models.User

router.get('/',function(req,res){
  res.render('admin/admin_login',{err:null})
})

router.post('/',(req, res)=> {
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
      if(obj.email === data.email && data.role === 2 && result){
        req.session.isLogin = true
        req.session.type = data.role
        res.redirect('/admin/home')
      }else{
        res.redirect('/admin')
      }
    })  
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/register',(req, res)=> {
  res.render('admin/admin_register')
})

router.post('/register',(req, res)=> {
  user.create({
      first_name :req.body.first_name,
      last_name :req.body.last_name,
      email:req.body.email,
      password:req.body.password,
      phone:req.body.phone,
      address:req.body.address,
      role:2
  }).then(()=>{
      res.redirect('/admin')
  }).catch(err=>{
      res.send(err)
  })
})

router.get('/logout',function(req,res){
  req.session.destroy(err=>{
    if(!err){
			res.redirect('/admin')
    }else{
      res.send(err)
    }
  })
})
module.exports = router