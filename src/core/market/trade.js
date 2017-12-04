import TradeLimits from '../../config/tradeLimits';
import FoxbitTools from '../tools/foxbitTools';
import FoxbitConstants from '../../config/foxbitConstants';
import WebSocket from './websocket';
import MinPriceError from '../errors/minPriceError';

class Trade extends WebSocket {
  constructor(ws) {
    super(ws);
    this.minPrice = parseFloat(TradeLimits.MIN_PRICE);
    this.maxPrice = parseFloat(TradeLimits.MAX_PRICE);

    this.onExecutionReport(FoxbitConstants.EXECUTION_REPORT.PARTIAL_EXECUTION, (err, x) => {
      if (err) throw err;
      this.amountToOrder -= x.CumQty;
    });

    this.onExecutionReport(FoxbitConstants.EXECUTION_REPORT.COMPLETE_EXECUTION, (err, x) => {
      if (err) throw err;
      if (this.activeOrderId === x.OrderID) this._resetKeepInTop(x.MDReqID);
    });
  }

  cancelOrder(orderId, clOrdID) {
    const cancel = { orderID: orderId, clientId: clOrdID };
    return this.ws.cancelOrder(cancel);
  }

  sendOrder(order, isTopRecursive, minPrice, maxPrice) {
    if (order.amount < FoxbitConstants.ORDER_MIN_PRICE) throw new MinPriceError();

    this.minPrice = parseFloat(minPrice) || this.minPrice;
    this.maxPrice = parseFloat(maxPrice) || this.maxPrice;

    const orderPromise = this.ws.sendOrder(order);
    orderPromise.then(x => {
      this.activeOrderId = x.OrderID;
      this.activeClOrdID = x.ClOrdID;

      if (isTopRecursive === true) {
        this._keepOrderInTop(order);
      }
    });
    return orderPromise;
  }

  _keepOrderInTop(order) {
    this.amountToOrder = order.amount;

    if (this.OrderBookMDReqID) this._unsubscribeOrderBook(this.OrderBookMDReqID);
    this.onOrderBook(FoxbitConstants.ORDERBOOK.NEW_ORDER, i => {
      this._verifyOrdersToKeepInTop(order, i);
    });
  }

  _verifyOrdersToKeepInTop(order, orderbook) {
    const orderToKeep = order;
    const isSameSide = order.isSameOrderSide(orderbook.side);
    const isMyPriceInTop = order.isMyPriceInTop(orderbook.price);
    const isMyOrder = orderbook.userId === this.userId;

    if (isMyPriceInTop === true || isMyOrder === true || isSameSide === false) {
      return;
    }

    let newPrice = order.gePriceByOrderbook(orderbook.price);
    orderToKeep.amount = this.amountToOrder;

    if (newPrice < this.minPrice) newPrice = this.minPrice;
    if (newPrice > this.maxPrice) newPrice = this.maxPrice;

    if (this.activeOrderId && this.activeClOrdID) {
      this.cancelOrder(this.activeOrderId, this.activeClOrdID).then(() => {
        this.orderBook.removeAllListeners(FoxbitConstants.ORDERBOOK.NEW_ORDER);
        orderToKeep.price = FoxbitTools.convertToNumberToSatoshis(newPrice);
        this.sendOrder(orderToKeep, true, this.minPrice, this.maxPrice);
      });
    }
  }

  _resetKeepInTop() {
    this._unsubscribeOrderBook();
    this.minPrice = parseFloat(TradeLimits.MIN_PRICE);
    this.maxPrice = parseFloat(TradeLimits.MAX_PRICE);
    this.activeOrderId = undefined;
    this.orderComplete = undefined;
    this.amountToOrder = undefined;
  }
}

export default Trade;
