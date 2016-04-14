'use strict';

var app = require('../..');
import request from 'supertest';

var newCompetitions;

describe('Competitions API:', function() {

  describe('GET /api/competitions', function() {
    var competitionss;

    beforeEach(function(done) {
      request(app)
        .get('/api/competitions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          competitionss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      competitionss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/competitions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/competitions')
        .send({
          name: 'New Competitions',
          info: 'This is the brand new competitions!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCompetitions = res.body;
          done();
        });
    });

    it('should respond with the newly created competitions', function() {
      newCompetitions.name.should.equal('New Competitions');
      newCompetitions.info.should.equal('This is the brand new competitions!!!');
    });

  });

  describe('GET /api/competitions/:id', function() {
    var competitions;

    beforeEach(function(done) {
      request(app)
        .get('/api/competitions/' + newCompetitions._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          competitions = res.body;
          done();
        });
    });

    afterEach(function() {
      competitions = {};
    });

    it('should respond with the requested competitions', function() {
      competitions.name.should.equal('New Competitions');
      competitions.info.should.equal('This is the brand new competitions!!!');
    });

  });

  describe('PUT /api/competitions/:id', function() {
    var updatedCompetitions;

    beforeEach(function(done) {
      request(app)
        .put('/api/competitions/' + newCompetitions._id)
        .send({
          name: 'Updated Competitions',
          info: 'This is the updated competitions!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCompetitions = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCompetitions = {};
    });

    it('should respond with the updated competitions', function() {
      updatedCompetitions.name.should.equal('Updated Competitions');
      updatedCompetitions.info.should.equal('This is the updated competitions!!!');
    });

  });

  describe('DELETE /api/competitions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/competitions/' + newCompetitions._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when competitions does not exist', function(done) {
      request(app)
        .delete('/api/competitions/' + newCompetitions._id)
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
