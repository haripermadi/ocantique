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
router.get('/detailProduct/:id',(req, res)=> {
    Model.Product.findById(req.params.id).then(data=>{
        // res.send(data)
        res.render('users/detailProduk',{product:data})
    }).catch(err=>{
        res.send(err)
    })
})
router.post('/register',(req, res)=> {
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
        res.send(err)
    })
})


module.exports = router