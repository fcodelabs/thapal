const {
  getBasicAuth,
} = require('./security');
const {SUPPORTED} = require('../index');
const {expect} = require('chai');

describe('Test collection security parser', () => {
  describe('Test getBasicAuth', () => {
    SUPPORTED.forEach(({schema}) => {
      it('Test with null data', () => {
        const actual = getBasicAuth({basic: {}}, schema);
        expect(actual).deep.equal({});
      });
    });
  });
});
