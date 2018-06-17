'use strict';

import superagent from 'superagent';
import app from '../../src/app.js';

describe('app module', () => {

  beforeAll(() => {
    app.start(8080);
  });

  afterAll(() => {
    app.stop();
  });

  it('should return 200 for homepage', () => {
    return superagent.get('http://localhost:8080')
      .then(res => {
        expect(res.statusCode).toBe(200);
      });
  });


  it('GET - 404 should respond with /"not found/" for valid requests made with an id that was not found', () => {
    return superagent
      .get('http://localhost:8080/api/v1/snacks/123')
      .catch(res => {
        expect(res.status).toBe(404);
        // expect(err.response.text).toEqual('Not Found');
      });
  });

  xit('GET 200 - should contain a response body for a request made with a valid id handles a good post request', () => {
    let obj = {id:'12345', name:'Brownies', calories:'300'};
    return superagent.post('http://localhost:8080/api/v1/snacks')
      .send(obj)
      .then(() => {
        return superagent.get('http://localhost:8080/api/v1/snacks/')
          .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toEqual(expect.stringContaining('brownies'));
          });
      });
  });

  it('POST - 400 should respond with /"bad request/" if no request body was provided or the body was invalid', () => {
    return superagent.post('http://localhost:8080/api/v1/snacks')
      .catch(res => {
        expect(res.status).toBe(400);
        expect(res.response.text).toEqual('Bad Request');
      });
  });

  it('POST: test 200, it should respond with the body content for a post request with a valid body', () => {
    return superagent.post('http://localhost:8080/api/v1/snacks')
      .send({
        id: '1234',
        name: 'Cookies',
        calories: '3000',
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(expect.stringContaining('calories'));
      });
  });

});