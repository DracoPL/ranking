'use strict';

var app = require('../..');
import request from 'supertest';

var newMatch;

describe('Match API:', function() {

  describe('GET /api/matchs', function() {
    var matchs;

    beforeEach(function(done) {
      request(app)
        .get('/api/matchs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          matchs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      matchs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/matchs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/matchs')
        .send({
          name: 'New Match',
          info: 'This is the brand new match!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMatch = res.body;
          done();
        });
    });

    it('should respond with the newly created match', function() {
      newMatch.name.should.equal('New Match');
      newMatch.info.should.equal('This is the brand new match!!!');
    });

  });

  describe('GET /api/matchs/:id', function() {
    var match;

    beforeEach(function(done) {
      request(app)
        .get('/api/matchs/' + newMatch._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          match = res.body;
          done();
        });
    });

    afterEach(function() {
      match = {};
    });

    it('should respond with the requested match', function() {
      match.name.should.equal('New Match');
      match.info.should.equal('This is the brand new match!!!');
    });

  });

  describe('PUT /api/matchs/:id', function() {
    var updatedMatch;

    beforeEach(function(done) {
      request(app)
        .put('/api/matchs/' + newMatch._id)
        .send({
          name: 'Updated Match',
          info: 'This is the updated match!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMatch = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMatch = {};
    });

    it('should respond with the updated match', function() {
      updatedMatch.name.should.equal('Updated Match');
      updatedMatch.info.should.equal('This is the updated match!!!');
    });

  });

  describe('DELETE /api/matchs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/matchs/' + newMatch._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when match does not exist', function(done) {
      request(app)
        .delete('/api/matchs/' + newMatch._id)
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
