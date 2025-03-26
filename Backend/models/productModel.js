const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {type: String, required: true },
  productDesc: {type: String, required: true },
  productPrice: {type: Number, required: true },
  productImage: {type: String, required: true },
  productCategory:{type: String, required: true } 
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;