const express = require('express')
const router = express.Router()
const Model = require('../models')
const op = require('sequelize').Op

router.get('/',(req, res)=> {
    Model.Product.findAll().then(data=>{
        res.render('index',{product:data})
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
        Model.User.create({
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
router.get('/login',(req, res)=> {
    res.render('users/login')
})
router.post('/login',(req, res)=> {
    Model.User.findOne({
        where:{
            email : req.params.email,
            // password : req.params.password
        }
    }).then(data=>{
        res.send(data)
        // res.redirect('/')
    }).catch(err=>{
        res.send(err)
    })
})

module.exports = router