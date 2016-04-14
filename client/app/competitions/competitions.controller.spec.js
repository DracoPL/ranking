'use strict';

describe('Component: CompetitionsComponent', function () {

  // load the controller's module
  beforeEach(module('rankingApp'));

  var CompetitionsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CompetitionsComponent = $componentController('CompetitionsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
