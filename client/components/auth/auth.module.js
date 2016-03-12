'use strict';

angular.module('rankingApp.auth', [
  'rankingApp.constants',
  'rankingApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
