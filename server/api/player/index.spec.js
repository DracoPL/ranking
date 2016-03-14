'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var playerCtrlStub = {
  index: 'playerCtrl.index',
  show: 'playerCtrl.show',
  create: 'playerCtrl.create',
  update: 'playerCtrl.update',
  destroy: 'playerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var playerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './player.controller': playerCtrlStub
});

describe('Player API Router:', function() {

  it('should return an express router instance', function() {
    playerIndex.should.equal(routerStub);
  });

  describe('GET /api/players', function() {

    it('should route to player.controller.index', function() {
      routerStub.get
        .withArgs('/', 'playerCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/players/:id', function() {

    it('should route to player.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'playerCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/players', function() {

    it('should route to player.controller.create', function() {
      routerStub.post
        .withArgs('/', 'playerCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/players/:id', function() {

    it('should route to player.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'playerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/players/:id', function() {

    it('should route to player.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'playerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/players/:id', function() {

    it('should route to player.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'playerCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
