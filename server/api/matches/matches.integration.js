'use strict';

var app = require('../..');
import request from 'supertest';

var newMatches;

describe('Matches API:', function() {

  describe('GET /api/matches', function() {
    var matchess;

    beforeEach(function(done) {
      request(app)
        .get('/api/matches')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          matchess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      matchess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/matches', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/matches')
        .send({
          name: 'New Matches',
          info: 'This is the brand new matches!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMatches = res.body;
          done();
        });
    });

    it('should respond with the newly created matches', function() {
      newMatches.name.should.equal('New Matches');
      newMatches.info.should.equal('This is the brand new matches!!!');
    });

  });

  describe('GET /api/matches/:id', function() {
    var matches;

    beforeEach(function(done) {
      request(app)
        .get('/api/matches/' + newMatches._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          matches = res.body;
          done();
        });
    });

    afterEach(function() {
      matches = {};
    });

    it('should respond with the requested matches', function() {
      matches.name.should.equal('New Matches');
      matches.info.should.equal('This is the brand new matches!!!');
    });

  });

  describe('PUT /api/matches/:id', function() {
    var updatedMatches;

    beforeEach(function(done) {
      request(app)
        .put('/api/matches/' + newMatches._id)
        .send({
          name: 'Updated Matches',
          info: 'This is the updated matches!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMatches = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMatches = {};
    });

    it('should respond with the updated matches', function() {
      updatedMatches.name.should.equal('Updated Matches');
      updatedMatches.info.should.equal('This is the updated matches!!!');
    });

  });

  describe('DELETE /api/matches/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/matches/' + newMatches._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when matches does not exist', function(done) {
      request(app)
        .delete('/api/matches/' + newMatches._id)
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
