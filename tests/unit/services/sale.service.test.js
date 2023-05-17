const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.models');
const salesService = require('../../../src/services/sales.services');
const { salesList } = require('../models/sales.model.mock')

describe('Sales Test', () => {
  describe('Verifica sucessos', () => {
    afterEach(() => sinon.restore())
    it('findAllProducts retorna todas as vendas', async () => {
      sinon.stub(salesModel, 'findAll').resolves(salesList);
      const result = await salesService.findAllSales();
      expect(result).to.be.equal(salesList);
    });
    it('findSaleById  retorna a venda pesquisada', async () => {
      sinon.stub(salesModel, 'findAll').resolves(salesList[0]);
      const result = await salesService.findSaleById(1);
      expect(result).to.be.not.equal(salesList[0]);
    });
  })
})