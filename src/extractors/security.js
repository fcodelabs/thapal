const {findVariable} = require('./collectionInfo');
const {clean} = require('../util/validation');

const getAuth = ({auth, variable}) => {
  const description = findVariable(variable, 'authDescription');
  if (auth?.type === 'basic') {
    return {
      basicAuth: clean({
        type: 'http',
        scheme: 'basic',
        description,
      }),
    };
  }
  return {};
};

exports.getAuth = getAuth;
