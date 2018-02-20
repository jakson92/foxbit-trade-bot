'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('../middleware/cors.middleware');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var auth = require('./auth.controller');
var orderbook = require('./book.controller');

var Controller = function Controller(app, foxbitApi) {
  _classCallCheck(this, Controller);

  app.use(_bodyParser2.default.json());
  app.use(_cors2.default);

  app.use('/auth', auth(foxbitApi));
  app.use('/orderbook', orderbook(foxbitApi));
};

exports.default = Controller;