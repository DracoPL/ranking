'use strict';

describe('Directive: addPlayer', function () {

  // load the directive's module and view
  beforeEach(module('rankingApp.addPlayer'));
  beforeEach(module('app/ranking/addPlayer/addPlayer.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<add-player></add-player>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the addPlayer directive');
  }));
});
