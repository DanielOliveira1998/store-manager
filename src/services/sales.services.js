const salesModel = require('../models/sales.models');

const createSale = async (saleInfo) => {
  await Promise.all(saleInfo.map((item) => {
    const product = salesModel.referSaleToProduct(item.quantity, item.productId);
    return product;
  }));
};

// const createSale = async (saleInfo) => {
//   const result = await salesModel.referSaleToProduct(saleInfo);
//   return result;
// };

module.exports = { createSale };