'use strict';

angular.module('rankingApp')
  .factory('competitionModel', function (Restangular) {
    Restangular.extendModel('competitions', function (model) {
        return model;
    });

    return Restangular.all('competitions');
  });
