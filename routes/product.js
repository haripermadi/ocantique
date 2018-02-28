const express = require('express');
const app = express();
const router = express.Router()
const models = require('../models')
const product = models.Product
const category = models.Category
const user = models.User
const currency  = require('../helpers/currency')


router.get('/',function(req,res){
  res.render('admin/index')
})

router.get('/products',function(req,res){
  product.findAll({
    include:[category]
  }).then(detail=>{
    // res.send(detail)
    res.render('admin/product',{data:detail,format:currency})
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/products/add',function(req,res){
  category.findAll().then(data=>{
    res.render('admin/add_product',{tag:data})
  }).catch(err=>{
    res.send(err)
  })
  
})

router.post('/products/add',function(req,res){
  product.create(req.body).then(data=>{
    res.redirect('/admin/home/products')
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/products/edit/:id',function(req,res){
  let id = req.params.id
  product.findOne({where:{id:id}}).then(data=>{
    // console.log(JSON.parse(JSON.stringify(data)))
    res.render('admin/edit_product',{dataProduct:data})
  }).catch(err=>{
    res.send(err)
  })
})
router.post('/products/edit/:id',function(req,res){
  let id = req.params.id
  product.update(req.body,{
    where:{id:id}})
    .then(data=>{
    res.redirect('/admin/home/products')
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/products/delete/:id',function(req,res){
  let id = req.params.id
  product.destroy({
    where:{id:id}})
    .then(()=>{
    res.redirect('/admin/home/products')
  })
})
module.exports = router
