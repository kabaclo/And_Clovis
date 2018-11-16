/* eslint-disable no-undef */
const Request = require('request');


describe('Server', () => {
  describe('GET ../server', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/', (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body).toBe('Welcome to Clovis\' API');
    });
  });
});
