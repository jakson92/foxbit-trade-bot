'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _foxbit = require('../src/core/market/foxbit');

var _foxbit2 = _interopRequireDefault(_foxbit);

var _orderWorker = require('./core/workers/orderWorker');

var _orderWorker2 = _interopRequireDefault(_orderWorker);

var _macd = require('./core/strategies/macd');

var _macd2 = _interopRequireDefault(_macd);

var _Debug = require('./core/tools/Debug');

var _Debug2 = _interopRequireDefault(_Debug);

var _web = require('./web');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Server = function () {
  function Server(app) {
    _classCallCheck(this, Server);

    this.api = new _foxbit2.default();
    this.web = new _web2.default(app, this.api);
  }

  _createClass(Server, [{
    key: 'startWebService',
    value: function startWebService() {
      var _this = this;

      this.web.start();
      var macd = new _macd2.default();

      macd.getCandlesHistory(5).then(function (x) {
        return _Debug2.default.log(x);
      });

      this.api.on('Logged', function () {
        _Debug2.default.highlight('User Logged');
        var worker = new _orderWorker2.default(_this.api);
        worker.storeMarketTicker();
      });
    }
  }]);

  return Server;
}();

exports.default = Server;