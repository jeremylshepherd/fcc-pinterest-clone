const app = require('../app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('/ should redirect to /login if unauthenticated', () => {
    it('should have 302 status code', (done) => {
        request(app)
            .get('/')
            .end((err, res) => {
                if(err) { return done(err); }
                expect(res.statusCode).to.equal(302);
                expect('Location', '/login');
                done();
            });
    });

    it('should redirect to /login', (done) => {
        request(app)
            .get('/')
            .end((err, res) => {
                if(err) { return done(err); }
                expect('Location', '/login');
                done();
            });
    });
});

describe('should login on valid email/password', () => {
    it('should have 302 status code and redirect to /', (done) => {
        request(app)
            .get('/')
            .end((err, res) => {
                if(err) { return done(err); }
                expect(res.statusCode).to.equal(302);
                expect('Location', '/login');
                request(app)
                    .post('/signon')
                    .send({
                        email: process.env.TEST_USER,
                        password: process.env.TEST_PASSWORD
                    })
                    .end((err, res) => {
                        if(err) { return done(err); }
                        expect('Location', '/');
                        done();
                    });
            });
    });
});

describe('should not login on invalid email/password', () => {
    it('should have 302 status code and redirect to /login', (done) => {
        request(app)
            .get('/')
            .end((err, res) => {
                if(err) { return done(err); }
                request(app)
                    .post('/signon')
                    .send({
                        email: 'wrong',
                        password: 'wronger'
                    })
                    .end((err, res) => {
                        if(err) { return done(err); }
                        expect('Location', '/login');
                        done();
                    });
            });
    });
});

describe('should logout and redirect to /login', () => {
    it('should have 302 status code and redirect to /login', (done) => {
        request(app)
            .post('/signon')
            .send({
                email: process.env.TEST_USER,
                password: process.env.TEST_PASSWORD
            })
            .end((err, res) => {
                if(err) { return done(err); }
                request(app)
                    .get('/logout')
                    .end((err, res) => {
                        if(err) { return done(err); }
                        request(app)
                            .get('/')
                            .end((err, res) => {
                                if(err) {return done(err);}
                                expect(res.statusCode).to.equal(302);
                                expect('Location', '/login');
                                done();
                            });
                    });
            });
    });
});
