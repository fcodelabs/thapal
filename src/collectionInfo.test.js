const {getCollectionSchema} = require('./collectionInfo');
const {expect} = require('chai');

describe('Test Collection Parser', () => {
  describe('Test getCollectionSchema', () => {
    it('Test with null data', () => {
      const actual = getCollectionSchema({info: {}});
      expect(actual).equal(undefined);
    });

    it('Check extracted version', () => {
      const actual = getCollectionSchema({
        info: {
          name: 'Test Info',
          schema: 'https://schema.getpostman.com/json/collection' +
              '/v3.2.1/collection.json',
        },
      });
      expect(actual).equal('3.2.1');
    });

    it('Check for invalid data', () => {
      const actual = getCollectionSchema({
        info: {
          schema: 'https://someurl.com/value/v3.43.3/fe',
        },
      });
      expect(actual).equal(undefined);
    });
  });
});
