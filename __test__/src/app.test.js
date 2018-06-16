import superagent from 'superagent';
import app from '../../src/app.js';
// import api from '../../src/api/api.js';

// beforeAll( () => {
//   app.start(8080);
// });

// afterAll( () => {
//   app.stop();
// });

describe('app module', () => {
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

  it('GET 200 - should contain a response body for a request made with a valid id handles a good post request', () => {
    // let obj = {"id":"88940410-710f-11e8-8bd7-512d4b0c4ab5","createdOn":"2018-06-16T02:46:56.465Z","title":"Foo","content":"This is newer content"};
    return superagent
      .get('http://localhost:8080/api/v1/snacks/88940410-710f-11e8-8bd7-512d4b0c4ab5')
      // .send(obj)
      .then(response => {
        expect(response.statusCode).toBe(200)
        console.log(response.data);
        expect(response.data).toEqual(expect.stringContaining('This is newer content'));
      })
      .catch(console.err);
  });

  it('POST - 400 should respond with /"bad request/" if no request body was provided or the body was invalid', () => {
    return superagent.post('http://localhost:8080/api/v1/snacks')
      .catch(err => {
        expect(err.status).toBe(400);
        expect(err.response.text).toEqual('Bad Request');
      });
  });

  it('POST: test 200, it should respond with the body content for a post request with a valid body', () => {
    let obj = {"id":"88940410-710f-11e8-8bd7-512d4b0c4ab5","createdOn":"2018-06-16T02:46:56.465Z","title":"Foo","content":"This is newer content"};
    return superagent.post('http://localhost:8080/api/v1/snacks')
      .send(obj)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(expect.stringContaining('This is newer content'));
      })
      .catch(console.err);
  });
  
});