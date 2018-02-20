'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rethinkdb = require('rethinkdb');

var _rethinkdb2 = _interopRequireDefault(_rethinkdb);

var _enviroment = require('../../enviroment/enviroment');

var _enviroment2 = _interopRequireDefault(_enviroment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Operations = function () {
  function Operations() {
    _classCallCheck(this, Operations);
  }

  _createClass(Operations, [{
    key: 'openDbConnection',
    value: function openDbConnection() {
      return _rethinkdb2.default.connect(_enviroment2.default.dbConnection);
    }
  }, {
    key: 'getCandlesByTime',
    value: function getCandlesByTime(table, qnt, callBack) {
      return this.openDbConnection().then(function (conn) {
        _rethinkdb2.default.table(table).orderBy(_rethinkdb2.default.desc('time')).limit(qnt).run(conn, callBack);
      });
    }
  }, {
    key: 'onInsert',
    value: function onInsert(table, filter, callBack) {
      this.openDbConnection().then(function (conn) {
        var changes = _rethinkdb2.default.table(table).changes();
        if (filter !== null) changes.filter(filter);

        changes.run(conn, function (err, cursor) {
          if (err) throw err;

          cursor.each(function (error, row) {
            if (error) throw error;

            if (row < 0) {
              row.close();
              return false;
            } else if (row.old_val === null) {
              callBack(row.new_val);
            }
          });
        });
      });
    }
  }, {
    key: 'insert',
    value: function insert(table, item) {
      this.openDbConnection().then(function (conn) {
        _rethinkdb2.default.table(table).insert(item).run(conn);
      });
    }
  }]);

  return Operations;
}();

exports.default = Operations;