#!/usr/bin/env node

const {safeDump} = require('js-yaml');
const fs = require('fs');
const {
  getInfo,
  getServers,
  getExternalDocs,
} = require('./extractors/collectionInfo');

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
  const openAPI = {
    ...getInfo(postmanJson),
    ...getExternalDocs(postmanJson),
    ...getServers(postmanJson),
    ...options,
    openapi: '3.0.3',
    paths: null,
  };
  return safeDump(openAPI, {skipInvalid: true});
};

exports.p2o = p2o;
exports.SUPPORTED = SUPPORTED;

