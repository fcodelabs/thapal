#!/usr/bin/env node

const {safeDump} = require('js-yaml');
const {readFile} = require('lint-staged');
const {getInfo, getServers, getExternalDocs} = require('collectionInfo');

const p2o = async (collectionPath, options = {}) => {
  const collectionFile = await readFile(collectionPath);
  const postmanJson = JSON.parse(collectionFile);
  const openAPI = {
    ...getInfo(postmanJson),
    ...getExternalDocs(postmanJson),
    ...getServers(postmanJson),
    ...options,
    openapi: '3.0.3',
  };
  return safeDump(openAPI, {skipInvalid: true});
};

module.exports = p2o;

