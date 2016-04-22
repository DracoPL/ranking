'use strict';

angular.module('rankingApp')
  .directive('editMatch', function ($mdMedia, $mdDialog) {

    var FormController = function($scope, $http, $timeout) {
      $scope.closeDialog = function() {
        $mdDialog.hide();
      };

      $scope.saveMatch = function () {
        $scope.match.save().then(()=>{
          $mdDialog.hide();
          if ($scope.callback) {
            $scope.callback();
          }
        });
      };
    };

    return {
      template: '<md-button class="md-raised" ng-click="openDialog()">Edit Match</md-button>',
      restrict: 'EA',
      scope: {
        callback: '&callback',
        match: '=matchObject'
      },
      link: function (scope) {
        scope.openDialog = function() {
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
          $mdDialog.show({
            controller: FormController,
            scope: scope,
            templateUrl: 'app/competitions/editMatch/editMatch.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            fullscreen: useFullScreen,
            preserveScope: true
          });
        };
      }
    };
  });
