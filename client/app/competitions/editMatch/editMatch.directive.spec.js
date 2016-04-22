'use strict';

describe('Directive: editMatch', function () {

  // load the directive's module and view
  beforeEach(module('rankingApp'));
  beforeEach(module('app/competitions/editMatch/editMatch.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<edit-match></edit-match>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the editMatch directive');
  }));
});
