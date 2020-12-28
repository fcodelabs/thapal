#!/usr/bin/env node

const {safeDump} = require('js-yaml');
const fs = require('fs');
const {
  getInfo,
  getServers,
  getExternalDocs,
  getCollectionSchema,
} = require('./extractors/collectionInfo');
const {clean} = require('./util/validation');
const {getAuth} = require('./extractors/security');
const {getTags} = require('./extractors/path');

const SUPPORTED = [
  {
    schema: '2.0.0',
    dir: 'v2',
  },
  {
    schema: '2.1.0',
    dir: 'v2.1',
  },
];

const p2o = (collectionPath, options = {}) => {
  const collectionFile = fs.readFileSync(collectionPath, 'utf8');
  const postmanJson = JSON.parse(collectionFile);
  const schema = getCollectionSchema(postmanJson);
  const apiMeta = clean({
    ...getInfo(postmanJson),
    ...getExternalDocs(postmanJson),
    ...getServers(postmanJson),
    ...options,
  });
  const components = {components: {}};
  const auth = getAuth(postmanJson, schema);
  const authKeys = Object.keys(auth);
  let security = undefined;
  if (authKeys.length > 0) {
    security = [{[authKeys[0]]: []}];
    components.components['securitySchemes'] = auth;
  }

  const openAPI = {
    openapi: '3.0.3',
    ...apiMeta,
    security,
    ...getTags(postmanJson),
    paths: null,
    ...clean(components),
  };
  const a = safeDump(openAPI, {skipInvalid: true});
  return a;
};

exports.p2o = p2o;
exports.SUPPORTED = SUPPORTED;

