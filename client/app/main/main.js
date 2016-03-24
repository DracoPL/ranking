'use strict';

angular.module('rankingApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        template: '<main></main>'
      });
  });
