'use strict';

const request = require('../lib');
const should = require('should');
const express = require('express');

describe.only('Generate swagger data', () => {
  it('should fire up the app on an ephemeral port', done => {
    const app = express();

    app.post('/api/orders/realm1/user', (req, res) => {
      res.send({
        data: [
          {
            id: 'orderId',
            userName: 'charlie',
            price: 123.45
          }
        ]
      });
    });

    request(app)
      .post('/api/orders/realm1/user?limit=1&offset=2')
      .send({
        data: {
          userId: 'charlie-123'
        }
      })
      .set('x-transaction-id', '111')
      .set('x-user-name', '222')
      .set('swagger-supertest', '')
      .end((err, res) => {
        res.body.data.length.should.be.equal(1);
        done();
      });
  });
});
