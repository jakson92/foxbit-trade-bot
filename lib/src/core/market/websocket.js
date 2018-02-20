'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _foxbitConstants = require('../../config/foxbitConstants');

var _foxbitConstants2 = _interopRequireDefault(_foxbitConstants);

var _eventInvalidError = require('../errors/eventInvalidError');

var _eventInvalidError2 = _interopRequireDefault(_eventInvalidError);

var _foxbitTools = require('../tools/foxbitTools');

var _foxbitTools2 = _interopRequireDefault(_foxbitTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebSocket = function (_EventEmitter) {
  _inherits(WebSocket, _EventEmitter);

  function WebSocket(ws) {
    _classCallCheck(this, WebSocket);

    var _this = _possibleConstructorReturn(this, (WebSocket.__proto__ || Object.getPrototypeOf(WebSocket)).call(this));

    _this.ws = ws;
    return _this;
  }

  _createClass(WebSocket, [{
    key: 'getBalance',
    value: function getBalance() {
      return this.ws.balance();
    }
  }, {
    key: 'getMyOrders',
    value: function getMyOrders() {
      return this.ws.myOrders();
    }
  }, {
    key: 'onTicker',
    value: function onTicker(event, listener) {
      var ticker = this.marketTicker || this._getTicker(event);

      event.forEach(function (element) {
        ticker.on(element, listener);
      });
    }
  }, {
    key: '_getTicker',
    value: function _getTicker(event) {
      var ticker = this.marketTicker || this.ws.subscribeTicker(event);
      this.marketTicker = ticker;
      return ticker;
    }
  }, {
    key: 'onExecutionReport',
    value: function onExecutionReport(event, listener) {
      if (!_foxbitTools2.default.hasPropertyWithValue(_foxbitConstants2.default.EXECUTION_REPORT, event)) return listener(new _eventInvalidError2.default(), undefined);

      var executionRep = this.executionReport || this._getExecutionReport();
      executionRep.on(event, listener);
    }
  }, {
    key: '_getExecutionReport',
    value: function _getExecutionReport() {
      var execution = this.executionReport || this.ws.executionReport();
      this.executionReport = execution;
      return execution;
    }
  }, {
    key: 'onOrderBook',
    value: function onOrderBook(event, listener) {
      if (!_foxbitTools2.default.hasPropertyWithValue(_foxbitConstants2.default.ORDERBOOK, event)) return listener(new _eventInvalidError2.default(), undefined);

      var book = this.orderBook || this._getOrderBook();
      book.on(event, listener);
    }
  }, {
    key: '_getOrderBook',
    value: function _getOrderBook() {
      var _this2 = this;

      var orderBook = this.orderBook || this.ws.subscribeOrderbook([_foxbitConstants2.default.DEFAULT_SYMBOL]);
      this.orderBook = orderBook;
      orderBook.then(function (x) {
        _this2.OrderBookMDReqID = x.MDReqID;
      });
      return orderBook;
    }
  }, {
    key: '_unsubscribeOrderBook',
    value: function _unsubscribeOrderBook() {
      this.ws.unSubscribeOrderbook(this.OrderBookMDReqID);
      this.OrderBookMDReqID = undefined;
      this.orderBook = undefined;
    }
  }, {
    key: 'ticker',
    value: function ticker(callback) {
      return this.ws.subscribeTicker([_foxbitConstants2.default.DEFAULT_TICK]).on(_foxbitConstants2.default.DEFAULT_TICK, callback);
    }
  }]);

  return WebSocket;
}(_events2.default);

exports.default = WebSocket;