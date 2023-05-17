const productServices = require('../services/products.services');

const saleValidation = (req, res, next) => {
  const bodyInfo = req.body;
  const validaProductId = bodyInfo.some((item) => item.productId === undefined);
  const validaQuantity = bodyInfo.some((item) => item.quantity === undefined);
  const validaQuantityValue = bodyInfo.some((item) => item.quantity <= 0);
  if (validaQuantity) return res.status(400).json({ message: '"quantity" is required' });
  if (validaProductId) return res.status(400).json({ message: '"productId" is required' });
  if (validaQuantityValue) {
  return res.status(422)
    .json({ message: '"quantity" must be greater than or equal to 1' }); 
  }
 next();
};

const validateDatabase = async (req, res, next) => {
  const bodyInfo = req.body;
  const productList = await productServices.findAllProducts();
  const idNotExiste = bodyInfo.find((item) => !productList
    .some((data) => data.id === item.productId));
  if (idNotExiste) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = { saleValidation, validateDatabase };