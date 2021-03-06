const {findVariable} = require('./collectionInfo');
const {clean} = require('../util/validation');

const getBasicAuth = (description) => ({
  BasicAuth: clean({
    type: 'http',
    scheme: 'basic',
    description,
  }),
});

const getApiKeyAuth = (authData, description, schema) => {
  let _in = undefined;
  let name = undefined;
  if (schema === '2.0.0') {
    _in = authData['in'];
    name = authData['key'];
  } else if (schema === '2.1.0') {
    _in = findVariable(authData, 'in');
    name = findVariable(authData, 'key');
  }
  const auth = {
    type: 'apiKey',
    in: _in,
    name,
    description,
  };
  return {ApiKeyAuth: clean(auth)};
};

const getBearerTokenAuth = (description) => ({
  BearerAuth: clean({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'TOKEN',
    description,
  }),
});

const getAuth = ({auth, variable}, schema) => {
  const description = findVariable(variable, 'authDescription');
  if (auth?.type === 'basic') {
    return getBasicAuth(description);
  }
  if (auth?.type === 'apikey') {
    const authData = auth['apikey'];
    return getApiKeyAuth(authData, description, schema);
  }
  if (auth?.type === 'bearer') {
    return getBearerTokenAuth(description);
  }
  return {};
};

exports.getAuth = getAuth;
