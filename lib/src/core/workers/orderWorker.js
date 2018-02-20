'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _array = require('lodash/array');

var _array2 = _interopRequireDefault(_array);

var _math2 = require('lodash/math');

var _math3 = _interopRequireDefault(_math2);

var _operations = require('../../database/operations');

var _operations2 = _interopRequireDefault(_operations);

var _ticker = require('../models/ticker');

var _ticker2 = _interopRequireDefault(_ticker);

var _candle = require('../models/candle');

var _candle2 = _interopRequireDefault(_candle);

var _Debug = require('../tools/Debug');

var _Debug2 = _interopRequireDefault(_Debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderWorker = function () {
  function OrderWorker(api) {
    _classCallCheck(this, OrderWorker);

    this.api = api;
    this.db = new _operations2.default();
    this.tickers = [];
  }

  _createClass(OrderWorker, [{
    key: 'storeMarketTicker',
    value: function storeMarketTicker() {
      var _this = this;

      this.api.onTicker(['BLINK:BTCBRL'], function (x) {
        _this._verifyAndStoreTicks(x);
      });
    }
  }, {
    key: '_verifyAndStoreTicks',
    value: function _verifyAndStoreTicks(tick) {
      if (this.tickers.length > 0) {
        var firstItemDate = _array2.default.head(this.tickers).time;
        var dateNow = new Date();

        if (this._addMinutes(firstItemDate, 5) < dateNow) {
          _Debug2.default.log('Candles store [' + this.tickers.length + '] ' + dateNow.getHours() + ':' + dateNow.getMinutes() + ':' + dateNow.getSeconds());
          this.db.insert('Candles', this._makeCandle(this.tickers));
          this.tickers = [];
        }
      }

      this.tickers.push(new _ticker2.default(tick.BestBid, tick.BestAsk));
    }
  }, {
    key: '_addMinutes',
    value: function _addMinutes(date, minutes) {
      var dateToChange = new Date(date);
      return new Date(dateToChange.setMinutes(dateToChange.getMinutes() + minutes));
    }
  }, {
    key: '_makeCandle',
    value: function _makeCandle(tickers) {
      if (tickers.length <= 0) return;
      var open = _math3.default.minBy(tickers, function (x) {
        return x.time;
      }).askPrice;
      var close = _math3.default.maxBy(tickers, function (x) {
        return x.time;
      }).askPrice;
      var high = _math3.default.maxBy(tickers, function (x) {
        return x.askPrice;
      }).askPrice;
      var low = _math3.default.minBy(tickers, function (x) {
        return x.askPrice;
      }).askPrice;

      return new _candle2.default(high, low, open, close);
    }
  }]);

  return OrderWorker;
}();

exports.default = OrderWorker;