var app = require('../app');
var request = require('supertest');

test('Initial Unit Test', () => {
    it('should return home page', (done) => {
        request(app)
            .get('/')
            .end((err, res) => {
                if(err) {return done(err);}
                expect(res.statusCode).toBe(302);
                expect(res.headers['location']).toBe('/login');
                done();
            });
    });
});
