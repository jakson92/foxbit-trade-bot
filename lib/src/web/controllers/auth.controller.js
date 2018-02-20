'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../business/auth.business');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express2.default.Router();
var foxbitApi = void 0;

router.post('/login', function (req, res) {
  var auth = new _auth2.default(foxbitApi);
  if (!req.body || !req.body.username || !req.body.password) return res.sendStatus(400);

  auth.login(req.body.username, req.body.password, req.body.secondFactor, function (x) {
    res.json(x);
  });
});

module.exports = function (_foxbitApi) {
  foxbitApi = _foxbitApi;
  return router;
};