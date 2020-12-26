const findVariable = (variables, name) => {
  const variable = variables?.find(
      ({key}) => key ? key.toLowerCase() === name.toLowerCase() : false,
  );
  return variable?.value;
};

const getCollectionSchema = ({info: {schema}}) => {
  const regex = '(?<=collection/v)[.0-9]+(?=/collection)';
  return schema?.match(regex)?.[0];
};

const getInfo = ({info: {name, description}, variable}) => ({
  info: {
    title: name,
    description,
    termsOfService: findVariable(variable, 'termsOfService'),
    contact: {
      name: findVariable(variable, 'contact.name'),
      url: findVariable(variable, 'contact.url'),
      email: findVariable(variable, 'contact.email'),
    },
    licence: {
      name: findVariable(variable, 'licence.name'),
      url: findVariable(variable, 'licence.url'),
    },
    version: findVariable(variable, 'version'),
  },
});

const getServers = ({variable}) => {
  const servers = variable.filter(
      ({key}) => key.toLowerCase()?.startsWith('server:'),
  );
  return {
    servers: servers.map(({key, value}) => ({
      url: value,
      description: key.substr(7).trim(),
    })),
  };
};

const getExternalDocs = ({variable}) => ({
  externalDocs: {
    url: findVariable(variable, 'externalDocs.url'),
    description: findVariable(variable, 'externalDocs.description'),
  },
});

exports.getCollectionSchema = getCollectionSchema;
exports.getInfo = getInfo;
exports.getServers = getServers;
exports.getExternalDocs = getExternalDocs;

