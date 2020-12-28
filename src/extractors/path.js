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


exports.getTags = getTags;
