const salesModel = require('../models/sales.models');

const findAllSales = async () => {
  const saleList = await salesModel.findAll();
  return saleList;
};

const findSaleById = async (id) => {
  const sale = await salesModel.findById(id);
  return sale;
};

const createSale = async (saleInfo) => {
  const result = await salesModel.referSaleToProduct(saleInfo);
  console.log('sale', result);
  return result;
};

const excludeSale = async (saleId) => {
  const deletedSale = await salesModel.exclude(saleId);
  if (deletedSale === 0) return undefined;
  return deletedSale;
};

module.exports = { createSale, findAllSales, findSaleById, excludeSale };