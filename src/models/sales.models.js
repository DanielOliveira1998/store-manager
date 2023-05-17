const camelize = require('camelize');
const connection = require('./connection');

const createSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date)  VALUES (NOW());',
  );
  return insertId;
};

// const referSaleToProduct = async (quantity, productId) => {
//   const saleId = createSale();
//   await connection.execute(
//     `INSERT INTO StoreManager.sales_products (quantity, sale_id, product_id)  
//     VALUES(?, ?, ?);`, [quantity, saleId, productId],
//   );
//   return {
//     id: saleId,
//   };
// };

const referSaleToProduct = async (saleInfo) => {
  const saleId = await createSale();
  console.log(saleId);
  await Promise.all(saleInfo.map((item) => connection.execute(
    `INSERT INTO StoreManager.sales_products (quantity, sale_id, product_id)  
     VALUES(?, ?, ?);`, [item.quantity, saleId, item.productId],
  )));
  return {
    id: saleId,
    itemsSold: saleInfo,
  };
};

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

const findAll = async () => {
  const result = await connection.execute(
    `SELECT date, product_id, quantity FROM StoreManager.sales
    AS sales Inner JOIN StoreManager.sales_products AS sProducts ON sales.id = sProducts.sale_id`,
  );
  return camelize(result);
};

const findById = async (saleId) => {
  const result = await connection.execute(
    `SELECT date, product_id, quantity FROM StoreManager.sales
    AS sales Inner JOIN StoreManager.sales_products AS sProducts ON sales.id = sProducts.sale_id
    where sales.id = ?`, [saleId],
  );
  return camelize(result);
};

module.exports = { referSaleToProduct, findAll, findById };