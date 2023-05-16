const connection = require('./connection');

const findAll = async () => {
  const result = await connection.execute(
    'SELECT * FROM StoreManager.products GROUP BY id ORDER BY id;',
  );
  const [products] = result;
  return products;
};

const findById = async (id) => {
  console.log('estive aqui', id);
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;', [id],
    );
  return product;
};

// const inset = () => {

// };
module.exports = {
  findAll,
  findById,
};