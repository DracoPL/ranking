'use strict';

angular.module('rankingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('competitionsShow', {
        url: '/competitions/:competitionId',
        template: '<show></show>'
        // resolve:{
        //    competitionData: ['$stateParams', '$http', function($stateParams, $http){
        //      return $http.get('/api/competitions/' + $stateParams.competitionId);
        //    }]
        // }
      });
  });
