/* global it, describe */
import sinon from 'sinon';
import { EventEmitter } from 'events';
import { assert, expect, should } from 'chai';
import { BlinkTradeWS } from 'blinktrade';
import WebSocket from '../../../src/core/market/websocket';
import FoxbitConstants from '../../../src/config/foxbitConstants';

describe('Web Socket', () => {
  it('Should request balance and match available balance.', done => {
    const available = { USD: 178116788294761, BTC: 1467995872214 };
    const mock = {
      5: {
        BTC_locked: 0,
        USD: 178116788294761,
        BTC: 1467995872214,
        USD_locked: 5500000000,
      },
      MsgType: 'U3',
      ClientID: 90800003,
    };

    const blinktrade = sinon.createStubInstance(BlinkTradeWS);
    const webSocket = new WebSocket(blinktrade);

    blinktrade.balance.resolves(mock);

    webSocket.getBalance().then(balance => {
      assert.equal(balance['5'].USD, available.USD);
      assert.equal(balance['5'].BTC, available.BTC);
      assert(blinktrade.balance.calledOnce);
      done();
    }).catch(err => done(err));
  });

  it('Should get my orders and match with available orders.', done => {
    const availableOrders = { price: 50001000000, OrderQty: 5000000 };
    const mock = {
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
        TimeInForce: '1',
      }],
      PageSize: 1,
      OrdersReqID: 930019,
      MsgType: 'U5',
      Page: 0,
    };

    const blinktrade = sinon.createStubInstance(BlinkTradeWS);
    const webSocket = new WebSocket(blinktrade);

    blinktrade.myOrders.resolves(mock);

    webSocket.getMyOrders().then(myOrders => {
      assert.equal(myOrders.OrdListGrp[0].Price, availableOrders.price);
      assert.equal(myOrders.OrdListGrp[0].OrderQty, availableOrders.OrderQty);
      done();
    }).catch(err => done(err));
  });

  it('Should get new reports without errors and the internal variable "executionReport" need exist.', done => {
    const blinktrade = sinon.createStubInstance(BlinkTradeWS);
    const webSocket = new WebSocket(blinktrade);

    const callback = sinon.spy();
    const emitter = new EventEmitter();
    blinktrade.executionReport.returns(emitter);

    webSocket.onExecutionReport(FoxbitConstants.EXECUTION_REPORT.NEW_EXECUTION, callback);
    emitter.emit(FoxbitConstants.EXECUTION_REPORT.NEW_EXECUTION);

    should().exist(webSocket.executionReport);
    assert.equal(callback.calledOnce, true);
    const errArg = callback.firstCall.args[0];
    expect(errArg).to.not.be.instanceof(Error);
    done();
  });

  it('Should return error when try get exectuion report with invalid event name.', () => {
    const callback = sinon.spy();
    const webSocket = new WebSocket();

    webSocket.onExecutionReport('Anything', callback);
    const errArg0 = callback.firstCall.args[0];

    assert.equal(callback.calledOnce, true);
    expect(errArg0).to.be.instanceof(Error);
  });

  it('Should return error when try get Order Book with invalid event name.', done => {
    const callback = sinon.spy();
    const webSocket = new WebSocket();

    webSocket.onOrderBook('Anything', callback);
    const errArg0 = callback.firstCall.args[0];

    assert.equal(callback.calledOnce, true);
    expect(errArg0).to.be.instanceof(Error);
    done();
  });

  it('Should get ticker without error.', done => {
    const blinktrade = sinon.createStubInstance(BlinkTradeWS);
    const webSocket = new WebSocket(blinktrade);

    const callback = sinon.spy();
    const emitter = new EventEmitter();
    blinktrade.subscribeTicker.returns(emitter);
    webSocket.ticker(callback);
    emitter.emit(FoxbitConstants.DEFAULT_TICK);

    assert.equal(callback.calledOnce, true);
    done();
  });
});

