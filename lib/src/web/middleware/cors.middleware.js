'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function CorsMiddleware(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
}

exports.default = CorsMiddleware;