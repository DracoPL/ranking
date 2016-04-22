'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var standingCtrlStub = {
  index: 'standingCtrl.index',
  show: 'standingCtrl.show',
  create: 'standingCtrl.create',
  update: 'standingCtrl.update',
  destroy: 'standingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var standingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './standing.controller': standingCtrlStub
});

describe('Standing API Router:', function() {

  it('should return an express router instance', function() {
    standingIndex.should.equal(routerStub);
  });

  describe('GET /api/standings', function() {

    it('should route to standing.controller.index', function() {
      routerStub.get
        .withArgs('/', 'standingCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/standings/:id', function() {

    it('should route to standing.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'standingCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/standings', function() {

    it('should route to standing.controller.create', function() {
      routerStub.post
        .withArgs('/', 'standingCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/standings/:id', function() {

    it('should route to standing.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'standingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/standings/:id', function() {

    it('should route to standing.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'standingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/standings/:id', function() {

    it('should route to standing.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'standingCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
