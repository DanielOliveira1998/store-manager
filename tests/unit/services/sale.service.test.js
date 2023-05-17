const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.models');
const salesService = require('../../../src/services/sales.services');
const { salesList, newSale } = require('../models/sales.model.mock')

describe('Sales Test', () => {
  describe('Verifica sucessos', () => {
    afterEach(() => sinon.restore())
    it('findAllProducts retorna todas as vendas', async () => {
      sinon.stub(salesModel, 'findAll').resolves(salesList);
      const result = await salesService.findAllSales();
      expect(result).to.be.equal(salesList);
    });
    it('findSaleById retorna a venda pesquisada', async () => {
      sinon.stub(salesModel, 'findAll').resolves(salesList[0]);
      const result = await salesService.findSaleById(1);
      expect(result).to.be.not.equal(salesList[0]);
    });
    it('excludeSale deleta uma venda', async () => {
      sinon.stub(salesModel, 'exclude').resolves(1);
      const result = await salesService.excludeSale(1);
      expect(result).to.be.deep.equal(1);
    })
  })
  describe('Verifica erro', async () => {
    it('findProductById com id errado', async () => {
      sinon.stub(salesModel, 'findAll').resolves(salesList[0]);
      const result = await salesService.findSaleById(1000);
      expect(result[0].length).to.be.equal(0);
    });
  });
})