'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _blinktrade = require('blinktrade');

var BlinkTrade = _interopRequireWildcard(_blinktrade);

var _foxbitConstants = require('../../config/foxbitConstants');

var _foxbitConstants2 = _interopRequireDefault(_foxbitConstants);

var _trade = require('./trade');

var _trade2 = _interopRequireDefault(_trade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FoxbitApi = function (_Trade) {
  _inherits(FoxbitApi, _Trade);

  function FoxbitApi() {
    _classCallCheck(this, FoxbitApi);

    var connection = { prod: _foxbitConstants2.default.PROD, currency: _foxbitConstants2.default.DEFAULT_CURRENCY, brokerId: _foxbitConstants2.default.BROKER_ID };
    var ws = new BlinkTrade.BlinkTradeWS(connection);

    var _this = _possibleConstructorReturn(this, (FoxbitApi.__proto__ || Object.getPrototypeOf(FoxbitApi)).call(this, ws));

    _this.isLogged = false;
    return _this;
  }

  _createClass(FoxbitApi, [{
    key: 'login',
    value: function login(userData) {
      var _this2 = this;

      return this.ws.connect().then(function () {
        var loginPromise = _this2.ws.login(userData);
        loginPromise.then(function (x) {
          _this2.isLogged = true;
          _this2.userId = x.UserID;
          _this2.keepConnectionAlive();
        });

        return loginPromise;
      });
    }
  }, {
    key: 'keepConnectionAlive',
    value: function keepConnectionAlive() {
      var _this3 = this;

      setInterval(function () {
        _this3.ws.heartbeat();
      }, _foxbitConstants2.default.HEARTH_BEAT_TIME);
    }
  }, {
    key: 'getFullOrderBook',
    value: function getFullOrderBook() {
      var blinktradeRest = new BlinkTrade.BlinkTradeRest({
        prod: _foxbitConstants2.default.PROD,
        currency: _foxbitConstants2.default.DEFAULT_CURRENCY
      });
      return blinktradeRest.orderbook();
    }
  }]);

  return FoxbitApi;
}(_trade2.default);

exports.default = FoxbitApi;