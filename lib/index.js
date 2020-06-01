'use strict';

const { Test, agent } = require('supertest');
const STest = require('./swagger-test');
const http = require('http');
const methods = require('methods');

/**
 * Initiate instance
 */
module.exports = (app) => {
  // Initiate test methods
  let obj = {};
  if (typeof app === 'function') {
    app = http.createServer(app);
  }
  for (let method of methods) {
    obj[method] = (url) => new STest(app, method, url);
  }
  // Support previous use of del
  obj.del = obj.delete;
  return obj;
};

module.exports.STest = STest;
module.exports.supertest = require('supertest');
module.exports.Test = Test;
module.exports.agent = agent;
