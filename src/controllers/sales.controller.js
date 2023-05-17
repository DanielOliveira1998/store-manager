const saleService = require('../services/sales.services');

const addSaleProduct = async (req, res) => {
  const saleInfo = req.body;
  const result = await saleService.createSale(saleInfo);
  return res.status(201).json(result);
};

module.exports = { addSaleProduct };