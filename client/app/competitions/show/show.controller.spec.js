'use strict';

describe('Component: CompetitionsShowComponent', function () {

  // load the controller's module
  beforeEach(module('rankingApp'));

  var ShowComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ShowComponent = $componentController('CompetitionsShowComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
