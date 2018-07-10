'use strict';

import superagent from 'superagent';
import app from '../../src/app.js';

describe('app module', () => {

  beforeAll(() => {
    app.start(3001);
  });

  afterAll(() => {
    app.stop();
  });

  it('404 - route has not been registered', () => {
    return superagent
      .get('http://localhost:3001/api/v1/weirdo')
      .catch(res => {
        expect(res.status).toBe(404);
      });
  });

  it('404 - invalid id', () => {
    return superagent
      .get('http://localhost:3001/api/v1/snack/1234567')
      .catch(res => {
        expect(res.status).toBe(404);
      });
  });

  it('400 - id not provided', (done) => {
    superagent
      .get('http://localhost:3001/api/v1/snack')
      .catch(res => {
        expect(res.status).toBe(400);
        expect(res.response.text).toEqual('Bad Request');
        done();
      });
  });

  it('200 - valid id provided', () => {
    let id;
    return superagent
      .post('http://localhost:3001/api/v1/snack/')
      .send({
        name: 'Brownies',
        calories: 300,
      })
      .then(data => {
        id = data.params.id;
        return superagent
          .get(`http://localhost:3001/api/v1/snack/${id}`)
          .then(res => {
            expect(res.statusCode).toBe(200);
          })
          .catch(res => console.error(res));
      })
      .catch(res => console.error('error', res));
  });

  it('200 - post request for valid body', () => {
    return superagent
      .post('http://localhost:3001/api/v1/snack/')
      .send({
        name: 'Brownies',
        calories: 300,
      })
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
      })
      .catch(res => console.error(res));
  });
});