const express = require('express')
const router = express.Router()
const Model = require('../models')
const op = require('sequelize').Op


router.post('/buyProduct/:id',(req, res)=> {
    console.log('session chek buy',req.session)
    Model.Order.findOne({
        where:{
            id_user: req.session.UserId,
            status:'pending'
        }
    }).then(data=>{
        if(!data){
            Model.Order.create({
                id_user : req.session.UserId,
                status : 'pending'
            }).then(dataOrder=>{
            //    res.send(dataOrder)
                Model.Order_Product.create({
                    id_product : req.params.id,
                    id_order: dataOrder.id,
                    quantity : req.body.quantity,
                }).then(()=>{
                    res.redirect('/')
                }).catch(err=>{
                    res.send(err)
                })
            }).catch(err=>{
                res.send(err)
            })
        }else{
            Model.Order_Product.create({
                id_product : req.params.id,
                id_order  :data.id,
                quantity  : req.body.quantity,
            }).then(()=>{
                res.redirect('/')
            }).catch(err=>{
                res.send(err)
            })
        }
    })
        
})

router.get('/cart',(req, res)=> {
    console.log('session cart',req.session)
    Model.Order.findOne({
        include:[Model.Product, Model.User, Model.Order_Product],
        where:{
            id_user:req.session.UserId,
            status:'pending'
        }
    }).then(data=>{
        let totalPayment = 0;
        let dataProduct = JSON.parse(JSON.stringify(data))
        for(let i=0; i<dataProduct.Products.length; i++){
            totalPayment+=(dataProduct.Products[i].price * dataProduct.Products[i].Order_Product.quantity)
        }
        //res.send(dataProduct.Products[0].price)
        // res.send('----')
        res.render('users/cartProduct',{product:data, payment:totalPayment})
        
    }).catch(err=>{
        res.render('users/cartProduct',{product:null})
    })
})
router.post('/checkout',(req, res)=> {
    Model.Order.update({
      amount :req.body.amount,
      status : 'process',
    },{
        where:{
            id_user:req.session.UserId,
        }
    }).then(()=>{
        Model.Order.findOne({
            include:[Model.Product, Model.User, Model.Order_Product],
            where:{
                id_user:req.session.UserId,
                status:'process'
            }
        }).then(data=>{
            res.render('users/invoice',{product:data})            
        }).catch(err=>{
            res.send(err)
        })
    }).catch(err=>{
        res.send(err)
    })
})
router.get('/history',(req,res)=>{
    Model.Order.findOne({
        include:[Model.Product, Model.User, Model.Order_Product],
        where:{
            id_user:req.session.UserId,
            status:'process'
        }
    }).then(data=>{
        res.render('users/invoice',{product:data})            
    }).catch(err=>{
        res.render('users/invoice',{product:null}) 
    })
})
router.get('/search',(req,res)=>{
    Model.Product.findAll({
        where:{
            
        }
    })
})


module.exports = router