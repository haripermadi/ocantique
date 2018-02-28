const express = require('express');
const app = express();
const router = express.Router()
const bcrypt = require('bcrypt');
const models = require('../models')
const user = models.User


router.get('/',(req, res)=> {
  res.render('users/login',{err:null})
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
      if(obj.email === data.email && data.role === 1 && result){
        req.session.isLogin = true
        req.session.type = data.role
        if(data.role === 1){
          // res.redirect('/user/${data.id}')
          res.redirect(`/users`)
        }else{
          res.send('User only')
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
    res.render('users/register',{error:null})
})

router.post('/register',(req, res)=> {
    if(req.body.password != req.body.retype_password){
        err = 'Verifikasi password tidak sesuai dengan password !!'
        res.render('users/register',{error:err})
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
            res.redirect('/')
        }).catch(err=>{
            res.render('users/register', {error:err.errors[0].message})
        })
    }

})

router.get('/logout',function(req,res){
  req.session.destroy(err=>{
    if(!err){
      let out = 'You have logged out!'
			// res.send(out)
			res.render('users/login',{err:out})
    }else{
      res.send(err)
    }
  })
})

module.exports = router
