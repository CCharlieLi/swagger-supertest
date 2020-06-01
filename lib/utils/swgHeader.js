'use strict';

const skipList = ['User-Agent', 'swagger-supertest'];

/**
 * @param {object} headers { 'User-Agent': 'node-superagent/3.8.3', ... }
 * @return {array}
 */
module.exports = (headers) => {
  const allowedHeaders = Object.keys(headers).filter(
    (name) => skipList.indexOf(name) < 0
  );
  return allowedHeaders.map((name) => ({
    in: 'header',
    name,
    example: headers[name],
    description: '',
    schema: {
      type: 'string',
    },
  }));
};
