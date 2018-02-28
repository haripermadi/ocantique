'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    id_category: DataTypes.INTEGER
  });

  Product.associate = function(models){
    Product.belongsToMany(models.Order,{through :models.Order_Product,foreignKey: 'id_product'})
    Product.hasMany(models.Order_Product,{foreignKey: 'id_product'})
    Product.belongsTo(models.Category,{foreignKey: 'id_category'})
  };

  return Product;
};
