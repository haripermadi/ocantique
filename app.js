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
  secret: 'keycat'
}))

app.use('/', index)
app.use('/users',user,)
app.use('/admin/home',authLoginAdmin.checkLoginAdmin,product)
app.use('/admin',admin)


app.listen(3000, () => console.log('connected!')) 
