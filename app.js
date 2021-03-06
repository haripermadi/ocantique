const express = require('express');
const bodyParser = require('body-parser');


const admin = require('./routes/admin')
const product = require('./routes/product')
const index = require('./routes/index')
const user = require('./routes/user')


const session = require('express-session')
const authLogin = require('./helpers/checklogin')
const authLoginAdmin = require('./helpers/checkloginAdmin')
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(session({
  secret: 'keycat',
  cookie:{}
}))

app.use('/', index)
app.use('/users',authLogin.checkLogin,user)
app.use('/admin/home',authLoginAdmin.checkLoginAdmin,product)
app.use('/admin',admin)


// app.get('/bikinsession',function(req,res){
//   req.session.isLogin =true
//   res.send(req.session)
// })
// app.get('/checksession',function(req,res){
  
//   res.send(req.session)
// })




app.listen(3000, () => console.log('connected!')) 
