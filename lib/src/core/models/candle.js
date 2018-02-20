"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Candle = function Candle(high, low, open, close) {
  _classCallCheck(this, Candle);

  this.high = high;
  this.low = low;
  this.open = open;
  this.close = close;
  this.time = new Date();
};

exports.default = Candle;