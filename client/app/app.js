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
  'ngMaterial'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/ranking');

    $locationProvider.html5Mode(true);
  });
