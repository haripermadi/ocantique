'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.INTEGER
  });

  User.associate = function(models){
    User.hasMany(models.Order,{foreignKey: 'id_user'})
    };

  return User;
};