'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express2.default.Router();
var foxbitApi = void 0;

router.get('/', function (req, res) {
  foxbitApi.getFullOrderBook().then(function (x) {
    var responseAsks = [];
    var responseBids = [];

    x.asks.forEach(function (data) {
      return responseAsks.push({ price: data[0], amount: data[1], userId: data[2] });
    });
    x.bids.forEach(function (data) {
      return responseBids.push({ price: data[0], amount: data[1], userId: data[2] });
    });

    res.send({
      asks: responseAsks,
      bids: responseBids
    });
  });
});

module.exports = function (_foxbitApi) {
  foxbitApi = _foxbitApi;
  return router;
};