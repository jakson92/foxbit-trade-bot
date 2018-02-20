'use strict';

var _chai = require('chai');

var _foxbitTools = require('../../../src/core/tools/foxbitTools');

var _foxbitTools2 = _interopRequireDefault(_foxbitTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe it */
describe('Foxbit Tools', function () {
  it('Should convert all numbers to satoshis without erros.', function () {
    _chai.assert.equal(_foxbitTools2.default.convertToNumberToSatoshis(999.85), 99985000000);
    _chai.assert.equal(_foxbitTools2.default.convertToNumberToSatoshis(2415.45), 241545000000);
    _chai.assert.equal(_foxbitTools2.default.convertToNumberToSatoshis(12345.67), 1234567000000);
    _chai.assert.equal(_foxbitTools2.default.convertToNumberToSatoshis(9876543210.45), 987654321045000100);
  });

  it('Shoul convert all satoshis to numbers without errors.', function () {
    _chai.assert.equal(_foxbitTools2.default.convertToSatoshisToNumber(99985000000), 999.85);
    _chai.assert.equal(_foxbitTools2.default.convertToSatoshisToNumber(241545000000), 2415.45);
    _chai.assert.equal(_foxbitTools2.default.convertToSatoshisToNumber(1234567000000), 12345.67);
    _chai.assert.equal(_foxbitTools2.default.convertToSatoshisToNumber(987654321045000100), 9876543210.45);
  });

  it('Should return validate if the obj has any property with the passed value.', function () {
    var defaultObj = {
      property1: '123',
      property2: 'asd',
      property3: 'ask'
    };

    _chai.assert.equal(_foxbitTools2.default.hasPropertyWithValue(defaultObj, 'asd'), true);
    _chai.assert.equal(_foxbitTools2.default.hasPropertyWithValue(defaultObj, 'fd'), false);
  });
});