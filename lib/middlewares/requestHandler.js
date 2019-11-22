'use strict';

const { URL } = require('url');

/**
 * Request data middleware
 */
module.exports = transactionId => req => {
  const myURL = new URL(req.url);
  const reqData = {
    path: myURL.pathname,
    method: req.method,
    query: myURL.searchParams.keys(),
    headers: req.header,
    data: req._data
  };

  return req;
};
