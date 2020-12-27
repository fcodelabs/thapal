const {
  getAuth,
} = require('./security');
const {expect} = require('chai');

describe('Test collection security parser', () => {
  it('Test with null data', () => {
    expect(getAuth({})).deep.equal({});
    expect(getAuth({}, '1234')).deep.equal({});
  });

  const variable = [
    {
      key: 'authDescription',
      value: 'This is the basic auth description',
    },
  ];

  describe('Check basic authentication', () => {
    const basicAuth = {
      type: 'basic',
      basic: [],
    };
    const expectedBasic = {
      BasicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    };

    it('Check basic auth without description', () => {
      const actual = getAuth({auth: basicAuth}, '1234');
      expect(actual).deep.equal(expectedBasic);
    });

    it('Check basic auth with description', () => {
      const input = {
        auth: basicAuth,
        variable,
      };
      const expected = {
        ...expectedBasic,
      };
      expected.BasicAuth['description'] = 'This is the basic auth description';
      const actual = getAuth(input, '1234');
      expect(actual).deep.equal(expected);
    });
  });

  describe('Check API key authentication', () => {
  });
});
