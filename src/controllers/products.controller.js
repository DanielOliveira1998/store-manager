const productService = require('../services/products.services');

const listProducts = async (req, res) => {
  const result = await productService.findAllProducts();
  return res.status(200).json(result);
};

const productById = async (req, res) => {
  const { id } = req.params;
  const result = await productService.findProductById(Number(id));
  if (!result) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(result);
};

const addCreatedProduct = async (req, res) => {
  const { name } = req.body;
  const result = await productService.createProduct(name);
  return res.status(201).json(result);
};

const updateList = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const result = await productService.updateProduct({ name, id });
  if (!result) return res.status(404).json({ message: 'Product not found' });
};

const excludeProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productService.excludeProduct(id);
  if (result === undefined) return res.status(404).json({ message: 'Product not found' });
  return res.status(204).json();
};

module.exports = { listProducts, productById, addCreatedProduct, updateList, excludeProduct };