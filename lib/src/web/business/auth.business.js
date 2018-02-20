'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthBusiness = function () {
  function AuthBusiness(foxbitApi) {
    _classCallCheck(this, AuthBusiness);

    this.api = foxbitApi;
  }

  _createClass(AuthBusiness, [{
    key: 'login',
    value: function login(username, password, secondFactor, callBack) {
      var _this = this;

      var userData = { username: username, password: password, secondFactor: secondFactor };
      this.api.login(userData).then(function (x) {
        if (x.UserStatus !== 1) return { status: 'fail' };

        _this.api.emit('Logged');
        callBack({
          status: 'success',
          username: x.Username
        });
      }).catch(function () {
        callBack({
          status: 'fail'
        });
      });
    }
  }]);

  return AuthBusiness;
}();

exports.default = AuthBusiness;