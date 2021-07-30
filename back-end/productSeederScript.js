require('dotenv').config();

const Products = require('./api/data/products.data');
const ProductModel = require('./api/model/Products.model');
const connectDB = require('./api/config/dbConnection');

connectDB();

const importData = async() => {
  try {
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(Products);
    console.log('Data import Successfully.');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

importData();