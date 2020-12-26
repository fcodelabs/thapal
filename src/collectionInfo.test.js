const {
  getCollectionSchema, getServers, getExternalDocs,
} = require('./collectionInfo');
const {expect} = require('chai');

describe('Test Collection Parser', () => {
  const collection = {
    'info': {
      '_postman_id': '1d1e2bcf-9352-4713-be7e-c0f9da9b16d4',
      'name': 'Test Info',
      'description': 'This collection is for testing openAPI ' +
          'information on collection',
      'schema': 'https://schema.getpostman.com/json/collection' +
          '/v2.0.0/collection.json',
    },
    'item': [],
    'variable': [
      {
        'key': 'contact.name',
        'value': 'Fcode Labs',
      },
      {
        'key': 'contact.email',
        'value': 'hello@fcodelabs.com',
      },
      {
        'key': 'licence.name',
        'value': 'The licence',
      },
      {
        'key': 'licence.url',
        'value': 'https://licence.com',
      },
      {
        'key': 'version',
        'value': '1.0.0',
      },
      {
        'key': 'server:Dev Server',
        'value': 'https://dev.server.com/api',
      },
      {
        'key': 'server: Prod Server',
        'value': 'https://prod.server.com/api',
      },
      {
        'key': 'externalDocs.description',
        'value': 'The external documentation',
      },
      {
        'key': 'externalDocs.url',
        'value': 'https://docs.com',
      },
    ],
  };
  const openapi = {
    info: {
      title: 'Test Info',
      description: 'This collection is for testing openAPI ' +
          'information on collection',
      contact: {
        name: 'Fcode Labs',
        email: 'hello@fcodelabs.com',
      },
      license: {
        name: 'The licence',
        url: 'https://licence.com',
      },
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://docs.com',
      description: 'The external documentation',
    },
    servers: [
      {url: 'https://dev.server.com/api', description: 'Dev Server'},
      {url: 'https://prod.server.com/api', description: 'Prod Server'},
    ],
  };


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

  describe('Test getServers', () => {
    it('Test with null data', () => {
      const actual = getServers({});
      expect(actual).deep.equal({});
    });

    it('Check extracted servers', () => {
      const actual = getServers(collection);
      expect(actual?.servers).deep.equal(openapi.servers);
    });
  });

  describe('Test getExternalDocs', () => {
    it('Test with null data', () => {
      const actual = getExternalDocs({});
      expect(actual).deep.equal({});
    });

    it('Check extracted docs', () => {
      const actual = getExternalDocs(collection);
      expect(actual?.externalDocs).deep.equal(openapi.externalDocs);
    });
  });
});
