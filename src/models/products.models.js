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

const create = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name)  VALUES (?);', [name],
  );
  return {
    id: insertId,
    name,
  };
};

const update = async (id, name) => {
    const [{ affectedRows }] = await connection.execute(
      'UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id],
    );
  console.log();
  return affectedRows;
};

const exclude = async (productId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?', [productId],
);
  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  exclude,
};