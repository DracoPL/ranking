'use strict';

describe('Service: competitionModel', function () {

  // load the service's module
  beforeEach(module('rankingApp'));

  // instantiate service
  var competitionModel;
  beforeEach(inject(function (_competitionModel_) {
    competitionModel = _competitionModel_;
  }));

  it('should do something', function () {
    expect(!!competitionModel).toBe(true);
  });

});
