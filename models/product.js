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

  Product.prototype.length = function () {
    if (this.description.length > 100) {
      let content = this.description.slice(0,99)
      return content + '...'
    }else{
      return this.description
    }
  }
  Product.getExpensive = function(){
    return Product.findAll({order:[['price','desc']],limit:3,
    include:[sequelize.models.Category]
  })
  }
  
  return Product;
};
