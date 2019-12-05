'use strict';

const request = require('../lib');
const express = require('express');

describe('Generate swagger data', () => {
  it('should generate swagger file for POST', done => {
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
      .set('swagger-supertest', './doc-test')
      .end((err, res) => {
        res.body.data.length.should.be.equal(1);
        done();
      });
  });

  it('should generate swagger file for PUT', done => {
    const app = express();
    app.put('/api/orders/realm1/user', (req, res) => {
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
      .put('/api/orders/realm1/user?limit=1&offset=2')
      .send({
        data: {
          userId: 'charlie-123'
        }
      })
      .set('x-transaction-id', '111')
      .set('x-user-name', '222')
      .set('swagger-supertest', './doc-test')
      .end((err, res) => {
        res.body.data.length.should.be.equal(1);
        done();
      });
  });

  it('should generate swagger file for GET', done => {
    const app = express();

    app.get('/api/orders/realm1/user', (req, res) => {
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
      .get('/api/orders/realm1/user?limit=1&offset=2')
      .set('x-transaction-id', '111')
      .set('x-user-name', '222')
      .set('swagger-supertest', './doc-test')
      .end((err, res) => {
        res.body.data.length.should.be.equal(1);
        done();
      });
  });
});
