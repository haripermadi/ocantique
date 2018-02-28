'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order_Product = sequelize.define('Order_Product', {
    id_product: DataTypes.INTEGER,
    id_order: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Order_Product;
};