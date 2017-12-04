/* global describe it */
import { assert } from 'chai';
import Constants from '../../../../src/config/foxbitConstants';
import SellOrder from '../../../../src/core/market/orders/sellorder';

describe('Sell Order', () => {
  it('The price and amount property need be instanciated and converted in satoshis.', () => {
    const order = new SellOrder(9000, 0.123);
    assert.equal(order.price, 900000000000);
    assert.equal(order.amount, 12300000);
  });

  it('The symbol need be the same of constants.', () => {
    const order = new SellOrder(850, 1);
    assert.equal(order.symbol, Constants.DEFAULT_SYMBOL);
  });

  it('The side need be 2 (Sell).', () => {
    const order = new SellOrder(1, 0.0001);
    assert.equal(order.side, '2');
  });

  it('Is same side should be true and without errors.', () => {
    const order = new SellOrder(29000, 0.0124871);
    const response = order.isSameOrderSide('sell');
    assert.equal(response, true);
  });

  it('Is same side should be false and without errors.', () => {
    const order = new SellOrder(250000, 2.124871);
    const response = order.isSameOrderSide('buy');
    assert.equal(response, false);
  });

  it('Is same side should not return errors with random strings.', () => {
    const order = new SellOrder(250000, 2.124871);
    const response = order.isSameOrderSide('adfasd');
    const response1 = order.isSameOrderSide('a123');
    const response2 = order.isSameOrderSide('@@##$$!!%%¨¨&&**(())--==23');

    assert.equal(response, false);
    assert.equal(response1, false);
    assert.equal(response2, false);
  });

  it('Is my price in top should return false and without errors.', () => {
    const order = new SellOrder(25000, 2.124871);
    const response = order.isMyPriceInTop(24999.99);
    assert.equal(response, false);
  });

  it('Is my price in top should return true and without errors.', () => {
    const order = new SellOrder(25000, 2.124871);
    const response = order.isMyPriceInTop(25000.01);
    assert.equal(response, true);
  });

  it('Price by books should return the value minus 0.01.', () => {
    const order = new SellOrder(2100, 61.8412);
    const response = order.gePriceByOrderbook(22154.84);
    assert.equal(response, 22154.83);
  });
});
