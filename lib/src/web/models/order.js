"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Order = function Order(price, amount, time) {
  _classCallCheck(this, Order);

  this.price = price;
  this.amount = amount;
  this.time = time;
};

exports.default = Order;