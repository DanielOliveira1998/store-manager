const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);
const productSevice = require('../../../src/services/products.services');
const productController = require('../../../src/controllers/products.controller');
const productsListMock = require('../models/products.model.mock');

describe('Controller Test', () => {
  afterEach(() => sinon.restore())
  describe('Verifica sucessos', () => {
    it('Verifica se listProducts retorna status 200', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productSevice, 'findAllProducts').resolves(productsListMock);
      await productController.listProducts(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsListMock);
    });

    it('Verifica se o findProductById retorna status 200', async () => {
      const req = {
        params: { id: 1 }
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productSevice, 'findProductById').resolves({ type: null, message: productsListMock[0] });
      await productController.productById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ type: null, message: productsListMock[0] });
    });

    it('Verifica addCreatedProduct retorna status 201', async () => {
      const req = {
        body: 'Novo produto'
      }
      const res = {}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productSevice, 'createProduct').resolves({
        id: 20, name: 'Novo produto'
      })
      await productController.addCreatedProduct(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: 20, name: 'Novo produto' })
    })
  });
  describe('Verificas erros', async () => {
    it('Verifica se listProducts retorna status 404', async () => {
      const req = {
        params: { id: 1000 }
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productSevice, 'findProductById').resolves(undefined);
      await productController.productById(req, res);
      console.log('status', res.status);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  })
});

