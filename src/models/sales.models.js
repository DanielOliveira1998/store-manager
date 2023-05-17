const camelize = require('camelize');
const connection = require('./connection');

const createSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date)  VALUES (NOW());',
  );
  return insertId;
};

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

const findAll = async () => {
  const result = await connection.execute(
    `SELECT date, product_id, quantity, id AS saleId FROM StoreManager.sales
    AS sales Inner JOIN StoreManager.sales_products AS sProducts ON sales.id = sProducts.sale_id`,
  );
  console.log(result);
  return camelize(result[0]);
};

const findById = async (saleId) => {
  const result = await connection.execute(
    `SELECT date, product_id AS productId, quantity FROM StoreManager.sales
    AS sales Inner JOIN StoreManager.sales_products AS sProducts ON sales.id = sProducts.sale_id
    where sales.id = ?`, [saleId],
  );
  return camelize(result);
};

const exclude = async (saleId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?', [saleId],
  );
  return affectedRows;
};

module.exports = { referSaleToProduct, findAll, findById, exclude };