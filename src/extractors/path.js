const {clean} = require('../util/validation');

const getTags = ({item}) => {
  const tags = item?.filter(
      (data) => data.item !== undefined,
  )?.map((data) => ({
    name: data.name,
    description: data.description,
  }));
  return clean({tags});
};

const parseURL = (url) => {
  if (typeof url === 'string') {
    const path = url.split('/').filter((p) => {
      const text = p.trim();
      if (!text) return false;
      if (text.startsWith('http') && text.endsWith(':')) return false;
      if (text.startsWith(':')) return true;
      return !text.startsWith('{');
    });
    return parseURL({path});
  }
  if (typeof url === 'object') {
    return '/' + url.path.reduce(
        (endpoint, path) => {
          const p = path.startsWith(':') ? `{${path.substr(1)}}` : path;
          return `${endpoint}/${p}`;
        },
    );
  }
  return undefined;
};

const getPath = ({name, request, response}, tag) => {
  const endpoint = parseURL(request?.url);
  const tags = tag ? [tag] : undefined;
  const method = clean({
    [request?.method?.toLowerCase() ?? 'get']: clean({
      tags,
      summary: name,
      description: request?.description,
      responses: {
        '200': {
          description: 'OK response',
        },
      },
    }),
  });
  return clean({[endpoint]: method});
};

const extractPaths = (item, tag = undefined) => {
  const itemMaps = [];
  const paths = item?.filter((i) => {
    if (i.item === undefined) {
      return true;
    }
    itemMaps.push(i);
    return false;
  })?.map((i) => getPath(i, tag)) ?? [];
  itemMaps.forEach((i) => paths.push(...extractPaths(i.item, i.name)));
  return paths;
};

const extractAndCombinePaths = ({item}) => {
  const pathsList = extractPaths(item, undefined);
  const paths = {};
  pathsList.forEach((path) => {
    const endpoint = Object.keys(path)[0];
    const method = Object.keys(path[endpoint])[0];
    if (paths[endpoint] === undefined) {
      paths[endpoint] = {};
    }
    paths[endpoint][method] = path[endpoint][method];
  });
  return Object.keys(paths).length === 0 ? {paths: null} : {paths};
};


exports.getTags = getTags;
exports.extractAndCombinePaths = extractAndCombinePaths;
