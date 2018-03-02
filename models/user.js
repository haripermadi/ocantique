'use strict';
const Op        = require('sequelize').Op
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg:'First Name must be filled !!'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg:'Last Name must be filled !!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email must be filled !!'
        },
        isUnique: function(value, next) {
          User.findAll({
            where:{
              email: value,
              id: { [Op.ne]: this.id, }
            }
          })
          .then(function(user) {
            if (user.length == 0) {
              next()
            } else {
              next('Email already used !!')
            }
          })
          .catch(function(err) {
            next(err)
          })
        }
      }
    },
    password:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg:'First Name must be filled !!'
        },
        len :{
          args: [6, 255],
          msg: 'Password at least 6 characters !!'
        }
      }
    },
    phone: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg:'Phone must be filled !!'
        },
      }
    },
    address: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg:'Address must be filled !!'
        },
      }
    },
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
    
    User.prototype.getFullname = function () {
      return `${this.first_name} ${this.last_name}`
    }
  return User;
};