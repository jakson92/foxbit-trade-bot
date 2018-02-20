'use strict';

var _chai = require('chai');

var _foxbitConstants = require('../../../../src/config/foxbitConstants');

var _foxbitConstants2 = _interopRequireDefault(_foxbitConstants);

var _buyorder = require('../../../../src/core/market/orders/buyorder');

var _buyorder2 = _interopRequireDefault(_buyorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Buy Order', function () {
  it('The price and amount property need be instanciated and converted in satoshis.', function () {
    var order = new _buyorder2.default(9000, 0.123);
    _chai.assert.equal(order.price, 900000000000);
    _chai.assert.equal(order.amount, 12300000);
  });

  it('The symbol need be the same of constants.', function () {
    var order = new _buyorder2.default(850, 1);
    _chai.assert.equal(order.symbol, _foxbitConstants2.default.DEFAULT_SYMBOL);
  });

  it('The side need be 1 (Buy).', function () {
    var order = new _buyorder2.default(1, 0.0001);
    _chai.assert.equal(order.side, '1');
  });

  it('Is same side should be true and without errors.', function () {
    var order = new _buyorder2.default(29000, 0.0124871);
    var response = order.isSameOrderSide('buy');
    _chai.assert.equal(response, true);
  });

  it('Is same side should be false and without errors.', function () {
    var order = new _buyorder2.default(250000, 2.124871);
    var response = order.isSameOrderSide('sell');
    _chai.assert.equal(response, false);
  });

  it('Is same side should not return errors with random strings.', function () {
    var order = new _buyorder2.default(250000, 2.124871);
    var response = order.isSameOrderSide('adfasd');
    var response1 = order.isSameOrderSide('a123');
    var response2 = order.isSameOrderSide('@@##$$!!%%¨¨&&**(())--==23');

    _chai.assert.equal(response, false);
    _chai.assert.equal(response1, false);
    _chai.assert.equal(response2, false);
  });

  it('Is my price in top should return true and without errors.', function () {
    var order = new _buyorder2.default(25000, 2.124871);
    var response = order.isMyPriceInTop(24999.99);
    _chai.assert.equal(response, true);
  });

  it('Is my price in top should return false and without errors.', function () {
    var order = new _buyorder2.default(25000, 2.124871);
    var response = order.isMyPriceInTop(25000.01);
    _chai.assert.equal(response, false);
  });

  it('Price by books should return the value plus 0.01.', function () {
    var order = new _buyorder2.default(2100, 61.8412);
    var response = order.gePriceByOrderbook(22154.84);
    _chai.assert.equal(response, 22154.85);
  });
}); /* global describe it */