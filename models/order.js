'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    id_user: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    status: DataTypes.STRING
  });

  Order.associate = function(models){
    Order.belongsToMany(models.Product,{through :models.Order_Product,foreignKey: 'id_order'})
    Order.hasMany(models.Order_Product,{foreignKey: 'id_order'})
    Order.belongsTo(models.User,{foreignKey: 'id_user'})
  };

  return Order;
};

