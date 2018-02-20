'use strict';

var _src = require('./src');

var _src2 = _interopRequireDefault(_src);

var _Debug = require('./src/core/tools/Debug');

var _Debug2 = _interopRequireDefault(_Debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

var PORT = process.env.port || 3000;
var app = express();

var server = new _src2.default(app);
server.startWebService();

app.listen(PORT, function () {
  _Debug2.default.success('We are living on the port: ' + PORT);
});