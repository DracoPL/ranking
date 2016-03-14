'use strict';

angular.module('rankingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ranking', {
        url: '/ranking',
        template: '<ranking></ranking>'
      });
  });
