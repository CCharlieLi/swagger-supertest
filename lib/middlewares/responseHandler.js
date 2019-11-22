'use strict';

/**
 * Record response data 
 */
module.exports = res => {
  const myURL = new URL(res.request.url);
  const reqData = {
    path: myURL.pathname,
    method: res.request.method,
    query: myURL.searchParams.keys(),
    headers: res.request.header,
    data: res.request._data
  };
  const resData = {
    statusCode: res.statusCode,
    body: res.body
  };
  console.log(reqData, resData);
};
