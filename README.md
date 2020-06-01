# swagger-supertest.js

[![Build Status](https://travis-ci.com/CCharlieLi/swagger-supertest.svg?branch=master)](https://travis-ci.com/CCharlieLi/swagger-supertest)
[![Coverage Status](https://coveralls.io/repos/github/CCharlieLi/swagger-supertest/badge.svg?branch=master)](https://coveralls.io/github/CCharlieLi/swagger-supertest?branch=master)

Running tests while generating swagger API specs.

### Usage:
```js
const supertest = require('swagger-supertest');

request(server)
  .get('/api/test')
  .set('swagger-supertest', './doc')
  .expect(404, done);

// Then you should see docs created under current /doc
```

TODO
- remove content type for GET, DELETE
- POST, PUT with empty request body
- define tag
- query string type
- remove stack from error
- path: description to summary
- object query string
