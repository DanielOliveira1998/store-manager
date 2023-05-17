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
  const product = await productsModel.create(name);
  return product;
};

const excludeProduct = async (productId) => {
  const deletedProduct = await productsModel.exclude(productId);
  if (deletedProduct === 0) return undefined;
  return deletedProduct;
};

module.exports = { findAllProducts, findProductById, createProduct, excludeProduct };