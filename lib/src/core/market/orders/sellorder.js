'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _foxbitConstants = require('../../../config/foxbitConstants');

var _foxbitConstants2 = _interopRequireDefault(_foxbitConstants);

var _foxbitTools = require('../../tools/foxbitTools');

var _foxbitTools2 = _interopRequireDefault(_foxbitTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SellOrder = function () {
  function SellOrder(price, amount) {
    _classCallCheck(this, SellOrder);

    this.side = '2';
    this.price = _foxbitTools2.default.convertToNumberToSatoshis(price);
    this.amount = _foxbitTools2.default.convertToNumberToSatoshis(amount);
    this.symbol = _foxbitConstants2.default.DEFAULT_SYMBOL;
  }

  _createClass(SellOrder, [{
    key: 'isSameOrderSide',
    value: function isSameOrderSide(side) {
      if (side === 'sell') {
        return true;
      }
      return false;
    }
  }, {
    key: 'isMyPriceInTop',
    value: function isMyPriceInTop(price) {
      var priceInSatoshis = _foxbitTools2.default.convertToNumberToSatoshis(price);
      if (this.price < priceInSatoshis) {
        return true;
      }
      return false;
    }
  }, {
    key: 'gePriceByOrderbook',
    value: function gePriceByOrderbook(value) {
      return value - 0.01;
    }
  }]);

  return SellOrder;
}();

exports.default = SellOrder;