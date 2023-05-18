const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/products.models');
const connection = require('../../../src/models/connection');
const productsListMock = require('./products.model.mock')

describe('Products Test', () => {
  describe('Verifica sucessos', () => {
    afterEach(() => sinon.restore())
    it('findAll retorna todos os produtos', async () => {
      sinon.stub(connection, 'execute').resolves([productsListMock]);
      const result = await productModel.findAll();
      expect(result).to.be.an('array');
      expect(result).to.be.length(3);
    });
    it('findById retorna o produto correto', async () => {
      sinon.stub(connection, 'execute').resolves([[productsListMock[0]]]);
      const result = await productModel.findById(1);
      expect(result).to.be.deep.equal(productsListMock[0]);
    })
    it('create retorna o produto criado', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 20 }]);
      const result = await productModel.create('Novo produto');
      expect(result).to.be.deep.equal({ id: 20, name: 'Novo produto' })
    })
  });
});