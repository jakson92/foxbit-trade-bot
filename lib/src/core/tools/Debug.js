'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint no-console: 0 */
var Debug = function () {
  function Debug() {
    _classCallCheck(this, Debug);
  }

  _createClass(Debug, [{
    key: 'log',
    value: function log(msg) {
      console.log(msg);
    }
  }, {
    key: 'highlight',
    value: function highlight(msg) {
      console.log('\x1b[36m%s\x1b[0m', msg);
    }
  }, {
    key: 'warning',
    value: function warning(msg) {
      console.log('\x1b[33m%s\x1b[0m', msg);
    }
  }, {
    key: 'error',
    value: function error(msg) {
      console.log('\x1b[31m%s\x1b[0m', msg);
    }
  }, {
    key: 'success',
    value: function success(msg) {
      console.log('\x1b[32m%s\x1b[0m', msg);
    }
  }]);

  return Debug;
}();

exports.default = new Debug();