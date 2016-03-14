'use strict';

describe('Component: RankingComponent', function () {

  // load the controller's module
  beforeEach(module('rankingApp'));

  var RankingComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    RankingComponent = $componentController('RankingComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
