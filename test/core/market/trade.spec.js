/* eslint no-underscore-dangle: 0 */
/* global it, describe */
import sinon from 'sinon';
import EventEmitter from 'events';
import { assert, expect } from 'chai';
import { BlinkTradeWS } from 'blinktrade';
import Trade from '../../../src/core/market/trade';
import TradeLimits from '../../../src/config/tradeLimits';
import FoxbitConstants from '../../../src/config/foxbitConstants';
import BuyOrder from '../../../src/core/market/orders/buyorder';

describe('Trade', () => {
  it('Should initialize the limits properties on the constructor.', done => {
    const blinktrade = sinon.createStubInstance(BlinkTradeWS);
    const emitter = new EventEmitter();
    blinktrade.executionReport.returns(emitter);
    const trade = new Trade(blinktrade);

    assert.equal(trade.minPrice, TradeLimits.MIN_PRICE);
    assert.equal(trade.maxPrice, TradeLimits.MAX_PRICE);
    done();
  });

  it('Should change the property "amountToOrder" on every partial executions.', done => {
    const blinktrade = sinon.createStubInstance(BlinkTradeWS);
    const emitter = new EventEmitter();
    blinktrade.executionReport.returns(emitter);
    const trade = new Trade(blinktrade);
    trade.amountToOrder = 20;
    emitter.emit(FoxbitConstants.EXECUTION_REPORT.PARTIAL_EXECUTION, undefined, { CumQty: 1 });

    assert.equal(trade.amountToOrder, 19);
    done();
  });

  it('Should call the function "resetKeepInTop" with the right arg on every complete execution.', done => {
    const mock = { OrderID: 123, MDReqID: 21 };
    const blinktrade = sinon.createStubInstance(BlinkTradeWS);
    const emitter = new EventEmitter();
    const spy = sinon.spy();
    blinktrade.executionReport.returns(emitter);
    const trade = new Trade(blinktrade);
    trade.activeOrderId = 123;
    trade._resetKeepInTop = spy;
    emitter.emit(FoxbitConstants.EXECUTION_REPORT.COMPLETE_EXECUTION, undefined, mock);

    assert.equal(spy.calledOnce, true);
    assert.equal(spy.calledWith(mock.MDReqID), true);
    done();
  });

  it('Should cancel the order with the right params.', done => {
    const mock = { orderID: 231, clientId: 123 };
    const blinktrade = sinon.createStubInstance(BlinkTradeWS);
    const emitter = new EventEmitter();
    const spy = sinon.spy();
    blinktrade.executionReport.returns(emitter);
    blinktrade.cancelOrder = spy;
    const trade = new Trade(blinktrade);
    trade.cancelOrder(mock.orderID, mock.clientId);

    assert.equal(spy.calledOnce, true);
    assert.equal(spy.calledWith(mock), true);
    done();
  });

  it('Should throw error when the price is lower than 0.0001.', () => {
    const blinktrade = sinon.createStubInstance(BlinkTradeWS);
    const emitter = new EventEmitter();
    blinktrade.executionReport.returns(emitter);
    const trade = new Trade(blinktrade);

    const buyOrder = new BuyOrder(2100.21, 0.00001);
    expect(() => { trade.sendOrder(buyOrder); }).to.throw(Error);
  });

  it('Should send order without errors and without recursion.', done => {
    const mock = { OrderID: 123, ClOrdID: 321 };
    const blinktrade = sinon.createStubInstance(BlinkTradeWS);
    const emitter = new EventEmitter();
    const spy = sinon.spy();
    blinktrade.executionReport.returns(emitter);
    blinktrade.sendOrder.resolves(mock);
    const trade = new Trade(blinktrade);
    trade._keepOrderInTop = spy;

    const buyOrder = new BuyOrder(2100.21, 0.0001);
    const sendedOrder = trade.sendOrder(buyOrder);

    sendedOrder.then(() => {
      assert.equal(trade.activeOrderId, mock.OrderID);
      assert.equal(trade.activeClOrdID, mock.ClOrdID);
      assert.equal(spy.called, false);
      done();
    });
  });

  it('Should change the min and max price in the class properties.', done => {
    const mock = { OrderID: 123, ClOrdID: 321 };
    const mockValues = { MinPrice: 22000, MaxPrice: 26000 };
    const blinktrade = sinon.createStubInstance(BlinkTradeWS);
    const emitter = new EventEmitter();
    const spy = sinon.spy();
    blinktrade.executionReport.returns(emitter);
    blinktrade.sendOrder.resolves(mock);
    const trade = new Trade(blinktrade);
    trade._keepOrderInTop = spy;

    const buyOrder = new BuyOrder(2100.21, 0.0001);
    const sendedOrder = trade.sendOrder(buyOrder, false, mockValues.MinPrice, mockValues.MaxPrice);

    sendedOrder.then(() => {
      assert.equal(trade.minPrice, mockValues.MinPrice);
      assert.equal(trade.maxPrice, mockValues.MaxPrice);
      assert.equal(trade.activeOrderId, mock.OrderID);
      assert.equal(trade.activeClOrdID, mock.ClOrdID);
      assert.equal(spy.called, false);
      done();
    });
  });

  it('Should call the method "_keepOrderInTop" when isRecursive is true.', done => {
    const mock = { OrderID: 123, ClOrdID: 321 };
    const blinktrade = sinon.createStubInstance(BlinkTradeWS);
    const spy = sinon.spy();
    const emitter = new EventEmitter();
    blinktrade.sendOrder.resolves(mock);
    blinktrade.executionReport.returns(emitter);
    const trade = new Trade(blinktrade);
    trade._keepOrderInTop = spy;

    const buyOrder = new BuyOrder(2100.21, 0.0001);
    const sendedOrder = trade.sendOrder(buyOrder, true);

    sendedOrder.then(() => {
      assert.equal(trade.activeOrderId, mock.OrderID);
      assert.equal(trade.activeClOrdID, mock.ClOrdID);
      assert.equal(spy.called, true);
      done();
    });
  });
});
