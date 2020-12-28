const {
  getTags,
} = require('./path');
const {expect} = require('chai');

describe('Test path parser', () => {
  describe('Check getTags', () => {
    it('Check for null inputs', () => {
      const actual = getTags({});
      expect(actual).deep.equal({});
    });

    it('Check with actual data', () => {
      const input = {
        item: [
          {
            name: 'Upper',
            item: [],
            description: 'This tag is called upper',
          },
          {
            name: 'Lower',
            item: [{name: 'Lower 1'}],
            description: 'This tag is called lower',
          },
          {
            name: 'Other Item',
            description: 'Other item description',
          },
        ],
      };
      const actual = getTags(input);
      const expected = {
        tags: [
          {name: 'Upper', description: 'This tag is called upper'},
          {name: 'Lower', description: 'This tag is called lower'},
        ],
      };
      expect(actual).deep.equal(expected);
    });
  });
});
