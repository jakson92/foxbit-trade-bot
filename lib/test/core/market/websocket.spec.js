'use strict';

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _events = require('events');

var _chai = require('chai');

var _blinktrade = require('blinktrade');

var _websocket = require('../../../src/core/market/websocket');

var _websocket2 = _interopRequireDefault(_websocket);

var _foxbitConstants = require('../../../src/config/foxbitConstants');

var _foxbitConstants2 = _interopRequireDefault(_foxbitConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global it, describe */
describe('Web Socket', function () {
  it('Should request balance and match available balance.', function (done) {
    var available = { USD: 178116788294761, BTC: 1467995872214 };
    var mock = {
      5: {
        BTC_locked: 0,
        USD: 178116788294761,
        BTC: 1467995872214,
        USD_locked: 5500000000
      },
      MsgType: 'U3',
      ClientID: 90800003
    };

    var blinktrade = _sinon2.default.createStubInstance(_blinktrade.BlinkTradeWS);
    var webSocket = new _websocket2.default(blinktrade);

    blinktrade.balance.resolves(mock);

    webSocket.getBalance().then(function (balance) {
      _chai.assert.equal(balance['5'].USD, available.USD);
      _chai.assert.equal(balance['5'].BTC, available.BTC);
      (0, _chai.assert)(blinktrade.balance.calledOnce);
      done();
    }).catch(function (err) {
      return done(err);
    });
  });

  it('Should get my orders and match with available orders.', function (done) {
    var availableOrders = { price: 50001000000, OrderQty: 5000000 };
    var mock = {
      OrdListGrp: [{
        ClOrdID: '8475400',
        OrderID: 1459028830968,
        CumQty: 0,
        OrdStatus: '0',
        LeavesQty: 5000000,
        CxlQty: 0,
        AvgPx: 0,
        Symbol: 'BTCUSD',
        Side: '1',
        OrdType: '2',
        OrderQty: 5000000,
        Price: 50001000000,
        OrderDate: '2016-09-07 04:35:30',
        Volume: 0,
        TimeInForce: '1'
      }],
      PageSize: 1,
      OrdersReqID: 930019,
      MsgType: 'U5',
      Page: 0
    };

    var blinktrade = _sinon2.default.createStubInstance(_blinktrade.BlinkTradeWS);
    var webSocket = new _websocket2.default(blinktrade);

    blinktrade.myOrders.resolves(mock);

    webSocket.getMyOrders().then(function (myOrders) {
      _chai.assert.equal(myOrders.OrdListGrp[0].Price, availableOrders.price);
      _chai.assert.equal(myOrders.OrdListGrp[0].OrderQty, availableOrders.OrderQty);
      done();
    }).catch(function (err) {
      return done(err);
    });
  });

  it('Should get new reports without errors and the internal variable "executionReport" need exist.', function (done) {
    var blinktrade = _sinon2.default.createStubInstance(_blinktrade.BlinkTradeWS);
    var webSocket = new _websocket2.default(blinktrade);

    var callback = _sinon2.default.spy();
    var emitter = new _events.EventEmitter();
    blinktrade.executionReport.returns(emitter);

    webSocket.onExecutionReport(_foxbitConstants2.default.EXECUTION_REPORT.NEW_EXECUTION, callback);
    emitter.emit(_foxbitConstants2.default.EXECUTION_REPORT.NEW_EXECUTION);

    (0, _chai.should)().exist(webSocket.executionReport);
    _chai.assert.equal(callback.calledOnce, true);
    var errArg = callback.firstCall.args[0];
    (0, _chai.expect)(errArg).to.not.be.instanceof(Error);
    done();
  });

  it('Should return error when try get exectuion report with invalid event name.', function () {
    var callback = _sinon2.default.spy();
    var webSocket = new _websocket2.default();

    webSocket.onExecutionReport('Anything', callback);
    var errArg0 = callback.firstCall.args[0];

    _chai.assert.equal(callback.calledOnce, true);
    (0, _chai.expect)(errArg0).to.be.instanceof(Error);
  });

  it('Should return error when try get Order Book with invalid event name.', function (done) {
    var callback = _sinon2.default.spy();
    var webSocket = new _websocket2.default();

    webSocket.onOrderBook('Anything', callback);
    var errArg0 = callback.firstCall.args[0];

    _chai.assert.equal(callback.calledOnce, true);
    (0, _chai.expect)(errArg0).to.be.instanceof(Error);
    done();
  });

  it('Should get ticker without error.', function (done) {
    var blinktrade = _sinon2.default.createStubInstance(_blinktrade.BlinkTradeWS);
    var webSocket = new _websocket2.default(blinktrade);

    var callback = _sinon2.default.spy();
    var emitter = new _events.EventEmitter();
    blinktrade.subscribeTicker.returns(emitter);
    webSocket.ticker(callback);
    emitter.emit(_foxbitConstants2.default.DEFAULT_TICK);

    _chai.assert.equal(callback.calledOnce, true);
    done();
  });
});