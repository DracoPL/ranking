'use strict';

var app = require('../..');
import request from 'supertest';

var newStanding;

describe('Standing API:', function() {

  describe('GET /api/standings', function() {
    var standings;

    beforeEach(function(done) {
      request(app)
        .get('/api/standings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          standings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      standings.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/standings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/standings')
        .send({
          name: 'New Standing',
          info: 'This is the brand new standing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newStanding = res.body;
          done();
        });
    });

    it('should respond with the newly created standing', function() {
      newStanding.name.should.equal('New Standing');
      newStanding.info.should.equal('This is the brand new standing!!!');
    });

  });

  describe('GET /api/standings/:id', function() {
    var standing;

    beforeEach(function(done) {
      request(app)
        .get('/api/standings/' + newStanding._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          standing = res.body;
          done();
        });
    });

    afterEach(function() {
      standing = {};
    });

    it('should respond with the requested standing', function() {
      standing.name.should.equal('New Standing');
      standing.info.should.equal('This is the brand new standing!!!');
    });

  });

  describe('PUT /api/standings/:id', function() {
    var updatedStanding;

    beforeEach(function(done) {
      request(app)
        .put('/api/standings/' + newStanding._id)
        .send({
          name: 'Updated Standing',
          info: 'This is the updated standing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedStanding = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStanding = {};
    });

    it('should respond with the updated standing', function() {
      updatedStanding.name.should.equal('Updated Standing');
      updatedStanding.info.should.equal('This is the updated standing!!!');
    });

  });

  describe('DELETE /api/standings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/standings/' + newStanding._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when standing does not exist', function(done) {
      request(app)
        .delete('/api/standings/' + newStanding._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
