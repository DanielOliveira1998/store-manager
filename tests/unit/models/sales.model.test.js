const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.models');
const connection = require('../../../src/models/connection');
const salesService = require('../../../src/services/sales.services');
const { salesList, newSale } = require('./sales.model.mock')

describe('Sales Test', () => {
  describe('Verifica sucessos', () => {
    afterEach(() => sinon.restore())
    it('findAll retorna todos os produtos', async () => {
      sinon.stub(connection, 'execute').resolves(salesList);
      const result = await salesModel.findAll();
      expect(result).to.be.equal(result);
    });
    it('exclude exclui uma venda', async () => {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await salesModel.exclude(1);
      expect(result).to.be.equal(1);
    })
  })
})