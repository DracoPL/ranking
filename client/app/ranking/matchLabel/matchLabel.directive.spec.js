'use strict';

describe('Directive: matchLabel', function () {

  // load the directive's module and view
  beforeEach(module('rankingApp'));
  beforeEach(module('app/ranking/matchLabel/matchLabel.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<match-label></match-label>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the matchLabel directive');
  }));
});
