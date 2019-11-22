'use strict';

const { Test } = require('supertest');
const { Request } = require('superagent');
const { resPlugin } = require('./middlewares');
const STest = function(app, method, url) {
  Test.call(this, app, method, url);
};
Object.setPrototypeOf(STest.prototype, Test.prototype);

/**
 * Add response plugin in end().
 * The rest is the same as https://github.com/visionmedia/supertest/blob/master/lib/test.js#L115
 */
STest.prototype.end = function(fn) {
  let self = this;
  let server = this._server;
  let end = Request.prototype.end;

  end.call(this, (err, res) => {
    // Use resonse data to create swagger
    if (res) {
      resPlugin(res);
    }

    if (server && server._handle) {
      return server.close(localAssert);
    }
    function localAssert() {
      self.assert(err, res, fn);
    }
    localAssert();
  });

  return this;
};

module.exports = STest;
