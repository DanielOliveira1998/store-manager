const express = require('express');
const productController = require('./controllers/products.controller');
const saleController = require('./controllers/sales.controller');
const { addProductValidation } = require('./middlewares/productsValidation');
const { saleValidation, validateDatabase } = require('./middlewares/salesValidation');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.listProducts);

app.get('/products/:id', productController.productById);

app.post('/products', addProductValidation, productController.addCreatedProduct);

app.post('/sales', saleValidation, validateDatabase, saleController.addSaleProduct);

app.get('/sales', saleController.listSales);

app.get('/sales/:id', saleController.saleById);

app.delete('/products/:id', productController.excludeProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;