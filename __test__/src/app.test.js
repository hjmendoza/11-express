'use strict';
import superagent from 'superagent';
import app from '../../src/app.js';
// import api from '../../src/api/api.js';



describe('app module', () => {
  beforeAll( () => {
    app.start();
  });
  
  afterAll( () => {
    app.stop();
  });
  
  it('should return 200 for homepage', () => {
    return superagent.get('http://localhost:8080/')
      .then(res => {
        expect(res.statusCode).toBe(200);
      });
  });

  it('GET - 404 should respond with /"not found/" for valid requests made with an id that was not found', () => {
    return superagent.get('http://localhost:8080/api/v1/snacks/notfound')
    .catch(err => {
      expect(err.status).toBe(404);
      expect(err.response.text).toEqual('Not Found');
    });
  });

  it('GET - 400 should respond with /"bad request/" if no id was provided in the request', () => {
    return superagent.get('http://localhost:8080/api/v1/snacks/:id')
    .catch(err => {
      expect(err.status).toBe(400);
      expect(err.response.text).toEqual('Bad Request');
    });
  });

  xit('GET 200 - should contain a response body for a request made with a valid id handles a good post request', () => {
    return superagent.get('http://localhost:8080/api/v1/snacks/88940410-710f-11e8-8bd7-512d4b0c4ab5')
      .send({
        id: '1234',
        title: 'Hello hi'
      })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response).toEqual(expect.stringContaining('This is newer content'));
      });
  });

  it('POST - 400 should respond with /"bad request/" if no request body was provided or the body was invalid', () => {
    return superagent.post('http://localhost:8080/api/v1/snacks')
      .catch(err => {
        expect(err.status).toBe(400);
        expect(err.response.text).toEqual('Bad Request');
      });
  });

  xit('POST: test 200, it should respond with the body content for a post request with a valid body', () => {
    return superagent.post('http://localhost:8080/api/v1/snacks')
      .send({id: '1234', content: 'This is newer content'})
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual('');
      })
      .catch(console.err);
  });
  
});