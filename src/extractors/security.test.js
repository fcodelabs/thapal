const {
  getAuth,
} = require('./security');
const {expect} = require('chai');

describe('Test collection security parser', () => {
  describe('Test getAuth', () => {
    it('Test with null data', () => {
      const actual = getAuth({});
      expect(actual).deep.equal({});
    });
  });
});
