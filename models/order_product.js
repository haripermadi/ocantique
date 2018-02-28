'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order_Product = sequelize.define('Order_Product', {
    id_product: DataTypes.INTEGER,
    id_order: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  });

  Order_Product.associate = function(models){
    Order_Product.belongsTo(models.Order,{foreignKey: 'id_order'})
    Order_Product.belongsTo(models.Product,{foreignKey: 'id_product'})
  };
  return Order_Product;
};