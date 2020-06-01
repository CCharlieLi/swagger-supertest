'use strict';

const fs = require('fs');
const path = require('path');
const json2swagger = require('data2swagger');
const { swgHeader, swgQuery } = require('../utils');

/**
 * Record response data
 */
module.exports = (res) => {
  const request = res.request;
  const reqHeaders = request.header;
  const url = new URL(request.url);
  const pathName = url.pathname;
  const method = request.method.toLowerCase();
  const query = url.searchParams.keys();
  const reqData = request._data;
  const statusCode = res.statusCode;
  const resBody = res.body;
  const contentType = reqHeaders['Content-Type'];
  const ifGenerateFile =
    Object.keys(reqHeaders).indexOf('swagger-supertest') > -1;
  const dirPath = reqHeaders['swagger-supertest'];

  if (ifGenerateFile) {
    const data = {
      [pathName]: {
        [method]:
          method === 'post' || method === 'put' || method === 'patch'
            ? {
                description: '',
                parameters: swgHeader(reqHeaders).concat(swgQuery([...query])),
                requestBody: {
                  content: {
                    [contentType]: json2swagger('schema', reqData),
                  },
                },
                responses: {
                  [statusCode]: {
                    description: '',
                    content: {
                      [contentType]: json2swagger('schema', resBody),
                    },
                  },
                },
              }
            : {
                description: '',
                parameters: swgHeader(reqHeaders).concat(swgQuery([...query])),
                responses: {
                  [statusCode]: {
                    description: '',
                    content: {
                      [contentType]: json2swagger('schema', resBody),
                    },
                  },
                },
              },
      },
    };

    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) throw err;
      fs.writeFileSync(
        path.resolve(dirPath, `${method}:${statusCode}`),
        JSON.stringify(data)
      );
    });
  }
};
