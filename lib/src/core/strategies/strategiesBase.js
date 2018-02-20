'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _operations = require('../../database/operations');

var _operations2 = _interopRequireDefault(_operations);

var _Debug = require('../tools/Debug');

var _Debug2 = _interopRequireDefault(_Debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StrategiesBase = function () {
  function StrategiesBase() {
    _classCallCheck(this, StrategiesBase);

    var operations = new _operations2.default();
    operations.onInsert('Candles', null, this.update);
  }

  _createClass(StrategiesBase, [{
    key: 'update',
    value: function update(data) {
      _Debug2.default.log(data);
    }
  }, {
    key: 'getCandlesHistory',
    value: function getCandlesHistory(qnt) {
      var operations = new _operations2.default();
      return new Promise(function (resolve, reject) {
        operations.getCandlesByTime('Candles', qnt, function (err, value) {
          if (err) reject(err);

          resolve(value);
        });
      });
    }
  }]);

  return StrategiesBase;
}();

module.exports = StrategiesBase;