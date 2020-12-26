const {clean} = require('./validation');
const {expect} = require('chai');

describe('Test Validations', () => {
  describe('Test clean function', () => {
    it('Null input check', () => {
      const actual1 = clean(undefined);
      expect(actual1).equal(undefined);
      const actual2 = clean(null);
      expect(actual2).equal(null);
    });

    it('Correct functionality', () => {
      const actual = clean({
        name: 'the name',
        description: undefined,
        address: {},
        contacts: [],
        education: {
          primary: {
            name: 'primary school',
            address: undefined,
          },
          secondary: undefined,
        },
      });
      const expected = {
        name: 'the name',
        education: {
          primary: {
            name: 'primary school',
            address: undefined,
          },
          secondary: undefined,
        },
      };
      expect(actual).deep.equal(expected);
    });
  });
});
