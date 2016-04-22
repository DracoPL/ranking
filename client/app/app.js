'use strict';

angular.module('rankingApp', [
  'rankingApp.auth',
  'rankingApp.admin',
  'rankingApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngMaterial',
  'restangular'
])
  .config(function($urlRouterProvider, $locationProvider, RestangularProvider) {
    $urlRouterProvider
      .otherwise('/competitions');

    $locationProvider.html5Mode(true);

    RestangularProvider.setBaseUrl('/api/');
    RestangularProvider.setRestangularFields({id: '_id'});
  });
