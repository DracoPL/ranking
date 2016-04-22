'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var matchesCtrlStub = {
  index: 'matchesCtrl.index',
  show: 'matchesCtrl.show',
  create: 'matchesCtrl.create',
  update: 'matchesCtrl.update',
  destroy: 'matchesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var matchesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './matches.controller': matchesCtrlStub
});

describe('Matches API Router:', function() {

  it('should return an express router instance', function() {
    matchesIndex.should.equal(routerStub);
  });

  describe('GET /api/matches', function() {

    it('should route to matches.controller.index', function() {
      routerStub.get
        .withArgs('/', 'matchesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/matches/:id', function() {

    it('should route to matches.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'matchesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/matches', function() {

    it('should route to matches.controller.create', function() {
      routerStub.post
        .withArgs('/', 'matchesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/matches/:id', function() {

    it('should route to matches.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'matchesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/matches/:id', function() {

    it('should route to matches.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'matchesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/matches/:id', function() {

    it('should route to matches.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'matchesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
