const parseCollection = ({info, variable}) => {
  return {
    schema: info['schema'],
    info: {
      title: info['name'],
      description: info['description'],
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
    externalDocs: {
      url: findVariable(variable, 'externalDocs.url'),
      description: findVariable(variable, 'externalDocs.description'),
    },
    servers: getServers(variable),
  };
};

const findVariable = (variables, name) => {
  const variable = variables.find(
      ({key}) => key ? key.toLowerCase() === name.toLowerCase() : false,
  );
  return variable?.value;
};

const getServers = (variables) => {
  const servers = variables.filter(
      ({key}) => key.toLowerCase()?.startsWith('server:'),
  );
  return servers.map(({key, value}) => ({url: value, description: key}));
};

export {parseCollection};
