'use strict';

angular.module('rankingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('competitions', {
        url: '/competitions',
        template: '<competitions></competitions>'
      });
  });
