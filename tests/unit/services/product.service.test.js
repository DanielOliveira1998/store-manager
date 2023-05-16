const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/products.models');
const productService = require('../../../src/services/products.services');
const productsListMock = require('../models/products.model.mock')

describe('Services Test', () => {
  describe('Verifica sucesso', () => {
    afterEach(() => sinon.restore())
    it('findAllProducts retorna todos os produtos', async () => {
      sinon.stub(productModel, 'findAll').resolves(productsListMock);
      const result = await productService.findAllProducts();
      expect(result).to.be.equal(productsListMock);
    });
    it('findProductById retorna o produto pesquisado', async () => {
      sinon.stub(productModel, 'findAll').resolves(productsListMock[0]);
      const result = await productService.findProductById(1);
      expect(result).to.be.not.equal(productsListMock[0]);
    });
  })
  describe('Verifica erro', async () => {
    const result = await productService.findProductById(1000);
    expect(result.message).to.be.equal('Product not found');
  })
})