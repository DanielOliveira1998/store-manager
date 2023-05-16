const productsModel = require('../models/products.models');

const findAllProducts = async () => {
  const productsList = await productsModel.findAll();
  return productsList;
};

const findProductById = async (id) => {
  const product = await productsModel.findById(id);
  return product;
};

const createProduct = async (name) => {
  console.log('entrei'); 
  const product = await productsModel.create(name);
  return product;
};

module.exports = { findAllProducts, findProductById, createProduct };