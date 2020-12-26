const clean = (obj) => {
  Object.keys(obj ?? {}).forEach(
      (key) => (obj[key] === undefined ||
          Object.entries(obj[key]).length === 0) &&
          delete obj[key],
  );
  return obj;
};

exports.clean = clean;
