const express = require('express');
const app = express();
const router = express.Router()
const Model = require('../models')
const product = Model.Product
const category = Model.Category
const user = Model.User
const order = Model.Order
const currency  = require('../helpers/currency')


router.get('/',function(req,res){
  let session = req.session.isLogin
  res.render('admin/index',{session:session})
  console.log(req.session)
})

router.get('/products',function(req,res){
  let session = req.session.isLogin
  product.findAll({
    include:[category]
  }).then(detail=>{
    // res.send(detail)
    res.render('admin/product',{data:detail,format:currency,session:session})
  }).catch(err=>{
    res.send(err)
  })
})
router.get('/products/expensive',function(req,res){
  let session = req.session.isLogin
  product.getExpensive().then(detail=>{
    // res.send(data)
    res.render('admin/product',{data:detail,format:currency,session:session})
  }).catch(err=>{
    res.send(err)
  })
})
router.get('/products/add',function(req,res){
  let session = req.session.isLogin
  category.findAll().then(data=>{
    res.render('admin/add_product',{tag:data,session:session})
  }).catch(err=>{
    res.render('admin/add_product',{error:null})
  })
  
})

router.post('/products/add',function(req,res){
  let session = req.session.isLogin
  product.create(req.body).then(data=>{
    res.redirect('/admin/home/products')
  }).catch(err=>{
    res.render('admin/add_product',{error:err.errors[0].message})
  })
})

router.get('/products/edit/:id',function(req,res){
  let session = req.session.isLogin
  let id = req.params.id
  product.findOne({where:{id:id}}).then(data=>{
    // console.log(JSON.parse(JSON.stringify(data)))
    res.render('admin/edit_product',{dataProduct:data,session:session})
  }).catch(err=>{
    res.send(err)
  })
})
router.post('/products/edit/:id',function(req,res){
  let session = req.session.isLogin
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
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/users',function(req,res){
  user.findAll({
    where:{role:1},
    include:[{model:order,where:{status:'process'}}]
  }).then(list=>{
    // res.send(list)
    res.render('admin/list_users',{data:list})
  }).catch(err=>{
    res.send(err)
  })
})
router.get('/users/:id/view',function(req,res){
  user.findOne({
    where:{
      id:req.params.id
    },
    include:[{model:order,where:{status:'process'}}]
  }).then(detail=>{
    // res.send(detail)
    res.render('admin/view_order',{data:detail})
  })
})

router.get('/users/:id/view/:OrderId/view',function(req,res){
  order.findAll({
    where:{id:req.params.OrderId},
    include:[product]
  }).then(detail=>{
    // res.send(detail[0])
    let totalPrice =0
    let list = JSON.parse(JSON.stringify(detail[0].Products))
    for(let i=0;i<list.length;i++){
      totalPrice+= list[i].price
    }
    // console.log('lissst',list)
    // console.log("totalllll",totalPrice)
    res.render('admin/order_detail',{data:detail,total:totalPrice})
  })
})

router.post('/users/:OrderId/delivered',function(req,res){
  order.update(req.body,{where:{id:req.params.OrderId}}).then(detail=>{
    res.redirect('/admin/home/users')
  }).catch(err=>{
    res.send(err)
  })
  // res.send(req.body)
})

module.exports = router
