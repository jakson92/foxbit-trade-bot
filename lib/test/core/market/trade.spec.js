'use strict';

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _chai = require('chai');

var _blinktrade = require('blinktrade');

var _trade = require('../../../src/core/market/trade');

var _trade2 = _interopRequireDefault(_trade);

var _tradeLimits = require('../../../src/config/tradeLimits');

var _tradeLimits2 = _interopRequireDefault(_tradeLimits);

var _foxbitConstants = require('../../../src/config/foxbitConstants');

var _foxbitConstants2 = _interopRequireDefault(_foxbitConstants);

var _buyorder = require('../../../src/core/market/orders/buyorder');

var _buyorder2 = _interopRequireDefault(_buyorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-underscore-dangle: 0 */
/* global it, describe */
describe('Trade', function () {
  it('Should initialize the limits properties on the constructor.', function (done) {
    var blinktrade = _sinon2.default.createStubInstance(_blinktrade.BlinkTradeWS);
    var emitter = new _events2.default();
    blinktrade.executionReport.returns(emitter);
    var trade = new _trade2.default(blinktrade);

    _chai.assert.equal(trade.minPrice, _tradeLimits2.default.MIN_PRICE);
    _chai.assert.equal(trade.maxPrice, _tradeLimits2.default.MAX_PRICE);
    done();
  });

  it('Should change the property "amountToOrder" on every partial executions.', function (done) {
    var blinktrade = _sinon2.default.createStubInstance(_blinktrade.BlinkTradeWS);
    var emitter = new _events2.default();
    blinktrade.executionReport.returns(emitter);
    var trade = new _trade2.default(blinktrade);
    trade.amountToOrder = 20;
    emitter.emit(_foxbitConstants2.default.EXECUTION_REPORT.PARTIAL_EXECUTION, undefined, { CumQty: 1 });

    _chai.assert.equal(trade.amountToOrder, 19);
    done();
  });

  it('Should call the function "resetKeepInTop" with the right arg on every complete execution.', function (done) {
    var mock = { OrderID: 123, MDReqID: 21 };
    var blinktrade = _sinon2.default.createStubInstance(_blinktrade.BlinkTradeWS);
    var emitter = new _events2.default();
    var spy = _sinon2.default.spy();
    blinktrade.executionReport.returns(emitter);
    var trade = new _trade2.default(blinktrade);
    trade.activeOrderId = 123;
    trade._resetKeepInTop = spy;
    emitter.emit(_foxbitConstants2.default.EXECUTION_REPORT.COMPLETE_EXECUTION, undefined, mock);

    _chai.assert.equal(spy.calledOnce, true);
    _chai.assert.equal(spy.calledWith(mock.MDReqID), true);
    done();
  });

  it('Should cancel the order with the right params.', function (done) {
    var mock = { orderID: 231, clientId: 123 };
    var blinktrade = _sinon2.default.createStubInstance(_blinktrade.BlinkTradeWS);
    var emitter = new _events2.default();
    var spy = _sinon2.default.spy();
    blinktrade.executionReport.returns(emitter);
    blinktrade.cancelOrder = spy;
    var trade = new _trade2.default(blinktrade);
    trade.cancelOrder(mock.orderID, mock.clientId);

    _chai.assert.equal(spy.calledOnce, true);
    _chai.assert.equal(spy.calledWith(mock), true);
    done();
  });

  it('Should throw error when the price is lower than 0.0001.', function () {
    var blinktrade = _sinon2.default.createStubInstance(_blinktrade.BlinkTradeWS);
    var emitter = new _events2.default();
    blinktrade.executionReport.returns(emitter);
    var trade = new _trade2.default(blinktrade);

    var buyOrder = new _buyorder2.default(2100.21, 0.00001);
    (0, _chai.expect)(function () {
      trade.sendOrder(buyOrder);
    }).to.throw(Error);
  });

  it('Should send order without errors and without recursion.', function (done) {
    var mock = { OrderID: 123, ClOrdID: 321 };
    var blinktrade = _sinon2.default.createStubInstance(_blinktrade.BlinkTradeWS);
    var emitter = new _events2.default();
    var spy = _sinon2.default.spy();
    blinktrade.executionReport.returns(emitter);
    blinktrade.sendOrder.resolves(mock);
    var trade = new _trade2.default(blinktrade);
    trade._keepOrderInTop = spy;

    var buyOrder = new _buyorder2.default(2100.21, 0.0001);
    var sendedOrder = trade.sendOrder(buyOrder);

    sendedOrder.then(function () {
      _chai.assert.equal(trade.activeOrderId, mock.OrderID);
      _chai.assert.equal(trade.activeClOrdID, mock.ClOrdID);
      _chai.assert.equal(spy.called, false);
      done();
    });
  });

  it('Should change the min and max price in the class properties.', function (done) {
    var mock = { OrderID: 123, ClOrdID: 321 };
    var mockValues = { MinPrice: 22000, MaxPrice: 26000 };
    var blinktrade = _sinon2.default.createStubInstance(_blinktrade.BlinkTradeWS);
    var emitter = new _events2.default();
    var spy = _sinon2.default.spy();
    blinktrade.executionReport.returns(emitter);
    blinktrade.sendOrder.resolves(mock);
    var trade = new _trade2.default(blinktrade);
    trade._keepOrderInTop = spy;

    var buyOrder = new _buyorder2.default(2100.21, 0.0001);
    var sendedOrder = trade.sendOrder(buyOrder, false, mockValues.MinPrice, mockValues.MaxPrice);

    sendedOrder.then(function () {
      _chai.assert.equal(trade.minPrice, mockValues.MinPrice);
      _chai.assert.equal(trade.maxPrice, mockValues.MaxPrice);
      _chai.assert.equal(trade.activeOrderId, mock.OrderID);
      _chai.assert.equal(trade.activeClOrdID, mock.ClOrdID);
      _chai.assert.equal(spy.called, false);
      done();
    });
  });

  it('Should call the method "_keepOrderInTop" when isRecursive is true.', function (done) {
    var mock = { OrderID: 123, ClOrdID: 321 };
    var blinktrade = _sinon2.default.createStubInstance(_blinktrade.BlinkTradeWS);
    var spy = _sinon2.default.spy();
    var emitter = new _events2.default();
    blinktrade.sendOrder.resolves(mock);
    blinktrade.executionReport.returns(emitter);
    var trade = new _trade2.default(blinktrade);
    trade._keepOrderInTop = spy;

    var buyOrder = new _buyorder2.default(2100.21, 0.0001);
    var sendedOrder = trade.sendOrder(buyOrder, true);

    sendedOrder.then(function () {
      _chai.assert.equal(trade.activeOrderId, mock.OrderID);
      _chai.assert.equal(trade.activeClOrdID, mock.ClOrdID);
      _chai.assert.equal(spy.called, true);
      done();
    });
  });
});