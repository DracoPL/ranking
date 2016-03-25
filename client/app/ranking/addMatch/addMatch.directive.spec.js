'use strict';

describe('Directive: addMatch', function () {

  // load the directive's module and view
  beforeEach(module('rankingApp.addMatch'));
  beforeEach(module('app/ranking/addMatch/addMatch.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<add-match></add-match>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the addMatch directive');
  }));
});
