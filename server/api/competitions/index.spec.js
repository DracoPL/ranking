'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var competitionsCtrlStub = {
  index: 'competitionsCtrl.index',
  show: 'competitionsCtrl.show',
  create: 'competitionsCtrl.create',
  update: 'competitionsCtrl.update',
  destroy: 'competitionsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var competitionsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './competitions.controller': competitionsCtrlStub
});

describe('Competitions API Router:', function() {

  it('should return an express router instance', function() {
    competitionsIndex.should.equal(routerStub);
  });

  describe('GET /api/competitions', function() {

    it('should route to competitions.controller.index', function() {
      routerStub.get
        .withArgs('/', 'competitionsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/competitions/:id', function() {

    it('should route to competitions.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'competitionsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/competitions', function() {

    it('should route to competitions.controller.create', function() {
      routerStub.post
        .withArgs('/', 'competitionsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/competitions/:id', function() {

    it('should route to competitions.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'competitionsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/competitions/:id', function() {

    it('should route to competitions.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'competitionsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/competitions/:id', function() {

    it('should route to competitions.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'competitionsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
