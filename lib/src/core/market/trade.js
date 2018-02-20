'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tradeLimits = require('../../config/tradeLimits');

var _tradeLimits2 = _interopRequireDefault(_tradeLimits);

var _foxbitTools = require('../tools/foxbitTools');

var _foxbitTools2 = _interopRequireDefault(_foxbitTools);

var _foxbitConstants = require('../../config/foxbitConstants');

var _foxbitConstants2 = _interopRequireDefault(_foxbitConstants);

var _websocket = require('./websocket');

var _websocket2 = _interopRequireDefault(_websocket);

var _minPriceError = require('../errors/minPriceError');

var _minPriceError2 = _interopRequireDefault(_minPriceError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Trade = function (_WebSocket) {
  _inherits(Trade, _WebSocket);

  function Trade(ws) {
    _classCallCheck(this, Trade);

    var _this = _possibleConstructorReturn(this, (Trade.__proto__ || Object.getPrototypeOf(Trade)).call(this, ws));

    _this.minPrice = parseFloat(_tradeLimits2.default.MIN_PRICE);
    _this.maxPrice = parseFloat(_tradeLimits2.default.MAX_PRICE);

    _this.onExecutionReport(_foxbitConstants2.default.EXECUTION_REPORT.PARTIAL_EXECUTION, function (err, x) {
      if (err) throw err;
      _this.amountToOrder -= x.CumQty;
    });

    _this.onExecutionReport(_foxbitConstants2.default.EXECUTION_REPORT.COMPLETE_EXECUTION, function (err, x) {
      if (err) throw err;
      if (_this.activeOrderId === x.OrderID) _this._resetKeepInTop(x.MDReqID);
    });
    return _this;
  }

  _createClass(Trade, [{
    key: 'cancelOrder',
    value: function cancelOrder(orderId, clOrdID) {
      var cancel = { orderID: orderId, clientId: clOrdID };
      return this.ws.cancelOrder(cancel);
    }
  }, {
    key: 'sendOrder',
    value: function sendOrder(order, isTopRecursive, minPrice, maxPrice) {
      var _this2 = this;

      if (order.amount < _foxbitConstants2.default.ORDER_MIN_PRICE) throw new _minPriceError2.default();

      this.minPrice = parseFloat(minPrice) || this.minPrice;
      this.maxPrice = parseFloat(maxPrice) || this.maxPrice;

      var orderPromise = this.ws.sendOrder(order);
      orderPromise.then(function (x) {
        _this2.activeOrderId = x.OrderID;
        _this2.activeClOrdID = x.ClOrdID;

        if (isTopRecursive === true) {
          _this2._keepOrderInTop(order);
        }
      });
      return orderPromise;
    }
  }, {
    key: '_keepOrderInTop',
    value: function _keepOrderInTop(order) {
      var _this3 = this;

      this.amountToOrder = order.amount;

      if (this.OrderBookMDReqID) this._unsubscribeOrderBook(this.OrderBookMDReqID);
      this.onOrderBook(_foxbitConstants2.default.ORDERBOOK.NEW_ORDER, function (i) {
        _this3._verifyOrdersToKeepInTop(order, i);
      });
    }
  }, {
    key: '_verifyOrdersToKeepInTop',
    value: function _verifyOrdersToKeepInTop(order, orderbook) {
      var _this4 = this;

      var orderToKeep = order;
      var isSameSide = order.isSameOrderSide(orderbook.side);
      var isMyPriceInTop = order.isMyPriceInTop(orderbook.price);
      var isMyOrder = orderbook.userId === this.userId;

      if (isMyPriceInTop === true || isMyOrder === true || isSameSide === false) {
        return;
      }

      var newPrice = order.gePriceByOrderbook(orderbook.price);
      orderToKeep.amount = this.amountToOrder;

      if (newPrice < this.minPrice) newPrice = this.minPrice;
      if (newPrice > this.maxPrice) newPrice = this.maxPrice;

      if (this.activeOrderId && this.activeClOrdID) {
        this.cancelOrder(this.activeOrderId, this.activeClOrdID).then(function () {
          _this4.orderBook.removeAllListeners(_foxbitConstants2.default.ORDERBOOK.NEW_ORDER);
          orderToKeep.price = _foxbitTools2.default.convertToNumberToSatoshis(newPrice);
          _this4.sendOrder(orderToKeep, true, _this4.minPrice, _this4.maxPrice);
        });
      }
    }
  }, {
    key: '_resetKeepInTop',
    value: function _resetKeepInTop() {
      this._unsubscribeOrderBook();
      this.minPrice = parseFloat(_tradeLimits2.default.MIN_PRICE);
      this.maxPrice = parseFloat(_tradeLimits2.default.MAX_PRICE);
      this.activeOrderId = undefined;
      this.orderComplete = undefined;
      this.amountToOrder = undefined;
    }
  }]);

  return Trade;
}(_websocket2.default);

exports.default = Trade;