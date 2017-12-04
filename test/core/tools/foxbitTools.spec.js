/* global describe it */
import { assert } from 'chai';
import Tools from '../../../src/core/tools/foxbitTools';

describe('Foxbit Tools', () => {
  it('Should convert all numbers to satoshis without erros.', () => {
    assert.equal(Tools.convertToNumberToSatoshis(999.85), 99985000000);
    assert.equal(Tools.convertToNumberToSatoshis(2415.45), 241545000000);
    assert.equal(Tools.convertToNumberToSatoshis(12345.67), 1234567000000);
    assert.equal(Tools.convertToNumberToSatoshis(9876543210.45), 987654321045000100);
  });

  it('Shoul convert all satoshis to numbers without errors.', () => {
    assert.equal(Tools.convertToSatoshisToNumber(99985000000), 999.85);
    assert.equal(Tools.convertToSatoshisToNumber(241545000000), 2415.45);
    assert.equal(Tools.convertToSatoshisToNumber(1234567000000), 12345.67);
    assert.equal(Tools.convertToSatoshisToNumber(987654321045000100), 9876543210.45);
  });

  it('Should return validate if the obj has any property with the passed value.', () => {
    const defaultObj = {
      property1: '123',
      property2: 'asd',
      property3: 'ask',
    };

    assert.equal(Tools.hasPropertyWithValue(defaultObj, 'asd'), true);
    assert.equal(Tools.hasPropertyWithValue(defaultObj, 'fd'), false);
  });
});
