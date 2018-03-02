const express = require('express')
const router = express.Router()
const Model = require('../models')
const op = require('sequelize').Op
const currency  = require('../helpers/currency')

router.get('/detailProduct/:id',(req, res)=> {
    let session = req.session.isLogin
    Model.Product.findById(req.params.id).then(data=>{
        // res.send(data)
        res.render('users/detailProduk',{product:data,session:session,format:currency})
    }).catch(err=>{
        res.send(err)
    })
  })
router.post('/buyProduct/:id',(req, res)=> {
    console.log('session chek buy',req.session)
    let session = req.session.isLogin
    if(session){
        Model.Order.findOne({
            where:{
                id_user: req.session.UserId,
                status:'pending'
            }
        }).then(data=>{
            console.log("======data find order",data)
            if(!data){
                Model.Order.create({
                    id_user : req.session.UserId,
                    status : 'pending'
                }).then(dataOrder=>{
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
        }).catch(err=>{
            res.send(err)
    })   
    }else{
        res.render('users/login',{session:session})
    }     
})

router.get('/cart',(req, res)=> {
    console.log('session cart',req.session)
    let session = req.session.isLogin
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
        // res.send(data)
        console.log("====data checkout",data)
        //res.send(dataProduct.Products[0].price)
        // res.send('----')
        res.render('users/cartProduct',{product:data, payment:totalPayment,session:session,format:currency})
        
    }).catch(err=>{
        res.render('users/cartProduct',{product:null,session:session})
    })
})
router.post('/checkout/:id',(req, res)=> {
    let session = req.session.isLogin
    console.log("====ini id order",req.params.id)
    Model.Order.update({
      amount :req.body.amount,
      status : 'process',
    },{
        where:{
            id_user:req.session.UserId,
        }
    }).then((detail)=>{
        // console.log('=====>',detail)
        Model.Order.findOne({
            include:[Model.Product, Model.User, Model.Order_Product],
            where:{
                id_user:req.session.UserId,
                id:req.params.id,
                status:'process'
            }
        }).then(data=>{
            // res.send(data)
            data.Products.forEach(dataProduct=>{
                Model.Product.update({
                    stock :(dataProduct.stock - dataProduct.Order_Product.quantity)
                },{
                    where:{
                        id: dataProduct.id
                    }
                }).then(()=>{    
                })
            })
            res.render('users/invoice',{product:data, session:session,format:currency})
                const api_key = 'key-c308389542e723498950204fda7a0626';
                const domain = 'sandboxfb581af684184131ad001e8c60137c43.mailgun.org';
                const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
                
                const formemail = {
                from: 'Ocantique <postmaster@sandboxfb581af684184131ad001e8c60137c43.mailgun.org>',
                to: 'srohimah29@gmail.com',
                subject: 'Invoice',
                html:  'terimakasih atas kepercayaan anda'
                };
                
                mailgun.messages().send(formemail, function (error, body) {
                console.log(body);
                });            
        }).catch(err=>{
            res.send(err)
        })
    }).catch(err=>{
        res.send(err)
    })
})
router.get('/history',(req,res)=>{
    let session = req.session.isLogin
    Model.Order.findOne({
        include:[Model.Product, Model.User, Model.Order_Product],
        where:{
            id_user:req.session.UserId,
            status:'process'
        }
    }).then(data=>{
        res.render('users/invoice',{product:data,session:session,format:currency})            
    }).catch(err=>{
        res.render('users/invoice',{product:null,session:session}) 
    })
})

module.exports = router