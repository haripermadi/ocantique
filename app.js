const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const admin = require('./routes/admin')
const index = require('./routes/index')
const user = require('./routes/user')

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine', 'ejs');

app.use('/', index)
app.use('/users', user)
app.use('/admin',admin)


app.listen(3000, () => console.log('connected!'))
