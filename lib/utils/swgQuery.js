'use strict';

/**
 * @param {object} queryString
 * @return {array}
 */
module.exports = query => {
  return query.map(name => ({
    name,
    in: 'query',
    description: '',
    schema: {
      type: 'string' // TODO
    }
  }));
};
