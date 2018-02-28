'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.INTEGER
  },{
    hooks:{
      beforeCreate:function(datauser){
        const saltRounds = 10;
        const myPlaintextPassword = datauser.password;
        return bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
      // Store hash in your password DB.
        datauser.password = hash
      })
    }
  }});

  User.associate = function(models){
    User.hasMany(models.Order,{foreignKey: 'id_user'})
    };

  return User;
};