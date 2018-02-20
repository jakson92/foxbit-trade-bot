"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FoxbitTools = function () {
  function FoxbitTools() {
    _classCallCheck(this, FoxbitTools);
  }

  _createClass(FoxbitTools, null, [{
    key: "convertToNumberToSatoshis",
    value: function convertToNumberToSatoshis(value) {
      return parseInt((value * 1e8).toFixed(0));
    }
  }, {
    key: "convertToSatoshisToNumber",
    value: function convertToSatoshisToNumber(value) {
      return parseFloat((value / 1e8).toFixed(2));
    }
  }, {
    key: "hasPropertyWithValue",
    value: function hasPropertyWithValue(obj, searchKey) {
      if (Object.keys(obj).some(function (key) {
        return obj[key] === searchKey;
      })) return true;
      return false;
    }
  }]);

  return FoxbitTools;
}();

exports.default = FoxbitTools;