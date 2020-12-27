const {p2o, SUPPORTED} = require('./index');
const {expect} = require('chai');
const {safeLoad} = require('js-yaml');
const fs = require('fs');

const testTypes = [
  'Test Info', 'Global Basic Auth', 'Global Bearer Token Auth',
  'Global API Key Auth',
];

const readOpenApi = (testType) => {
  const text = fs.readFileSync(
      `./samples/openapi/${testType}.openapi.yaml`,
      'utf8',
  );
  return safeLoad(text);
};

const getCollection = (testType, dir) => `./samples/collection/${dir}/` +
    `${testType}.postman_collection.json`;

describe('Test p2o with real life examples', () => {
  SUPPORTED.forEach(({schema, dir}) => {
    describe(`Test for schema: ${schema}`, () => {
      testTypes.forEach((testType) => {
        it(`${testType} collection`, () => {
          const collectionPath = getCollection(testType, dir);
          const actual = safeLoad(p2o(collectionPath));
          const expected = readOpenApi(testType);
          expect(actual).deep.equal(expected);
        });
      });
    });
  });
});
