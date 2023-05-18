const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const salesService = require('../../../src/services/sales.services');
const salesController = require('../../../src/controllers/sales.controller');

// describe('Controller Sales Test', () => {
//   describe('Verifica sucessos', () => {
//     it('Verifica deleção', async () => {
//       const req = {
//         params: { id: 1 }
//       };
//       const res = {};
//       res.status = sinon.stub().returns(res);
//       res.json = sinon.stub().returns();
//       sinon.stub(salesService, 'excludeSale').resolves(1)
//       const result = await salesController.excludeSale(req, res);
//       expect(result).to.be.equal(null);
//     })
//   });
// })