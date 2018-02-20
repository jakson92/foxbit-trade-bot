"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ticker = function Ticker(lowPrice, highPrice, lastPrice, bestBid) {
  _classCallCheck(this, Ticker);

  this.lowPrice = lowPrice;
  this.highPrice = highPrice;
  this.lastPrice = lastPrice;
  this.bestBid = bestBid;
  this.time = new Date();
};

exports.default = Ticker;