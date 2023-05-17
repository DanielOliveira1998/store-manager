const saleService = require('../services/sales.services');

const addSaleProduct = async (req, res) => {
  const saleInfo = req.body;
  const result = await saleService.createSale(saleInfo);
  console.log('controller', result);
  return res.status(201).json(result);
};

const listSales = async (req, res) => {
  const result = await saleService.findAllSales();
  return res.status(200).json(result);
};

const saleById = async (req, res) => {
  const { id } = req.params;
  const result = await saleService.findSaleById(Number(id));
  if (result[0].length === 0) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(result[0]);
};

module.exports = { addSaleProduct, listSales, saleById };