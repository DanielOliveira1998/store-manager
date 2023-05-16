const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/products.models');
const productConnection = require('../../../src/models/connection');
const connection = require('../../../src/models/connection');
const productsListMock = require('./products.model.mock')

describe('Products Test', () => {
  describe('Verifica sucessos', () => {
    it('findAll retorna todos os produtos', async () => {
      sinon.stub(connection, 'execute').resolves([productsListMock]);
      const result = await productModel.findAll();
      expect(result).to.be.an('array');
      expect(result).to.be.length(3);
      sinon.restore()
    });
    it('findById retorna o produto correto', async () => {
      sinon.stub(connection, 'execute').resolves([[productsListMock[0]]]);
      const result = await productModel.findById(1);
      expect(result).to.be.deep.equal(productsListMock[0]);
      sinon.restore()
    })
  });
});