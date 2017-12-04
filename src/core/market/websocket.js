import FoxbitConstants from '../../config/foxbitConstants';
import EventInvalidError from '../errors/eventInvalidError';
import Tools from '../tools/foxbitTools';

class WebSocket {
  constructor(ws) {
    this.ws = ws;
  }

  getBalance() {
    return this.ws.balance();
  }

  getMyOrders() {
    return this.ws.myOrders();
  }

  onExecutionReport(event, listener) {
    if (!Tools.hasPropertyWithValue(FoxbitConstants.EXECUTION_REPORT, event)) return listener(new EventInvalidError(), undefined);

    const executionRep = this.executionReport || this._getExecutionReport();
    executionRep.on(event, listener);
  }

  _getExecutionReport() {
    const execution = this.executionReport || this.ws.executionReport();
    this.executionReport = execution;
    return execution;
  }

  onOrderBook(event, listener) {
    if (!Tools.hasPropertyWithValue(FoxbitConstants.ORDERBOOK, event)) return listener(new EventInvalidError(), undefined);

    const book = this.orderBook || this._getOrderBook();
    book.on(event, listener);
  }

  _getOrderBook() {
    const orderBook = this.orderBook || this.ws.subscribeOrderbook([FoxbitConstants.DEFAULT_SYMBOL]);
    this.orderBook = orderBook;
    orderBook.then(x => { this.OrderBookMDReqID = x.MDReqID; });
    return orderBook;
  }

  _unsubscribeOrderBook() {
    this.ws.unSubscribeOrderbook(this.OrderBookMDReqID);
    this.OrderBookMDReqID = undefined;
    this.orderBook = undefined;
  }

  ticker(callback) {
    return this.ws.subscribeTicker([FoxbitConstants.DEFAULT_TICK])
      .on(FoxbitConstants.DEFAULT_TICK, callback);
  }
}

export default WebSocket;
