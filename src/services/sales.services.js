const salesModel = require('../models/sales.models');

// const createSale = async (saleInfo) => {
//   const promiseResolves = Promise.all(saleInfo.map((item) => {
//     const salesInf = salesModel.referSaleToProduct(item.quantity, item.productId);
//     console.log('sales', salesInf);
//     return salesInf;
//   }));
//   return promiseResolves;
// };

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

module.exports = { createSale, findAllSales, findSaleById };