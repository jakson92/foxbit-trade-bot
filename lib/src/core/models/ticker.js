"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ticker = function Ticker(bid, ask) {
  _classCallCheck(this, Ticker);

  this.bidPrice = bid;
  this.askPrice = ask;
  this.time = new Date();
};

exports.default = Ticker;