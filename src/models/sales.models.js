const connection = require('./connection');

const createSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date)  VALUES (NOW());',
  );
  return insertId;
};

const referSaleToProduct = async (quantity, productId) => {
  console.log(quantity);
  console.log(productId);
  const saleId = createSale();
  const ProductSales = await connection.execute(
    `INSERT INTO StoreManager.sales_products (quantity, sale_id, product_id)  
    VALUES(?, ?, ?);`, [quantity, saleId, productId],
  );
  return ProductSales;
};

// const referSaleToProduct = async (saleInfo) => {
//   const saleId = createSale();
//   await Promise.all(saleInfo.map((item) => connection.execute(
//     `INSERT INTO StoreManager.sales_products (quantity, sale_id, product_id)  
//      VALUES(?, ?, ?);`, [item.quantity, saleId, item.productId],
//   )));
//   return {
//     id: saleId,
//     itemSold: saleInfo,
//   };
// };

// const createSale = async (quantity, productId) => {
//   const [{ insertId }] = await connection.execute(
//     'INSERT INTO StoreManager.sales (date)  VALUES (NOW());',
//   );
//   await connection.execute(
//     `INSERT INTO StoreManager.sales_products (quantity, sale_id, product_id)  
//     VALUES(?, ?, ?);`, [quantity, insertId, productId],
//   );
//   return {
//     id: insertId,
//     quantity,
//   };
// };
module.exports = { referSaleToProduct };