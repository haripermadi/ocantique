const express = require('express')
const bodyParser = require('body-parser')
const index = require('./routes/index')
// const admin = require('./routes/admin')
const user = require('./routes/user')
 
const app = express()
app.set('view engine', 'ejs');
 
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
// app.use('/admin', admin)
app.use('/users', user)
app.listen(3000);
console.log('check....');