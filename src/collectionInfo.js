const findVariable = (variables, name) => {
  const variable = variables?.find(
      ({key}) => key ? key.toLowerCase() === name.toLowerCase() : false,
  );
  return variable?.value;
};

const clean = (obj) => {
  Object.keys(obj).forEach(
      (key) => (obj[key] === undefined ||
          Object.entries(obj[key]).length === 0) &&
          delete obj[key],
  );
  return obj;
};

const getCollectionSchema = ({info: {schema}}) => {
  const regex = '(?<=collection/v)[.0-9]+(?=/collection)';
  return schema?.match(regex)?.[0];
};

const getInfo = ({info: {name, description}, variable}) => {
  const contact = clean({
    name: findVariable(variable, 'contact.name'),
    url: findVariable(variable, 'contact.url'),
    email: findVariable(variable, 'contact.email'),
  });
  const license = clean({
    name: findVariable(variable, 'license.name'),
    url: findVariable(variable, 'license.url'),
  });
  const info = clean({
    title: name,
    description,
    contact,
    termsOfService: findVariable(variable, 'termsOfService'),
    license,
    version: findVariable(variable, 'version'),
  });
  return clean({info});
};

const getServers = ({variable}) => {
  const serverVars = variable?.filter(
      ({key}) => key.toLowerCase()?.startsWith('server:'),
  );
  const servers = serverVars?.map(({key, value}) => ({
    url: value,
    description: key.substr(7).trim(),
  }));
  return clean({servers});
};

const getExternalDocs = ({variable}) => {
  const url = findVariable(variable, 'externalDocs.url');
  const description = findVariable(variable, 'externalDocs.description');
  return url || description ? {externalDocs: {url, description}} : {};
};

exports.getCollectionSchema = getCollectionSchema;
exports.getInfo = getInfo;
exports.getServers = getServers;
exports.getExternalDocs = getExternalDocs;

