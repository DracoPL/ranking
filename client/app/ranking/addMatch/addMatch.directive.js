'use strict';

angular.module('rankingApp')
  .directive('addMatch', function ($mdMedia, $mdDialog) {
    var getDefaultMatch = function(){
      return {};
    };

    var FormController = function($scope, $http, $timeout) {

      $scope.loadPlayers = function() {
        return $timeout(function() {
          return $http.get('/api/players').then(function(response){
            $scope.players = response.data;
            return response.data;
          });
        }, 500);
      };

      $scope.closeDialog = function() {
        $mdDialog.hide();
      };

      $scope.addNewMatch = function () {
        $http.post('/api/matchs', $scope.newMatch).then(function(){
          $scope.callback();
          $scope.newMatch = getDefaultMatch();
          if(!$scope.addAnother){
            $mdDialog.hide();
          }
        });
      };
    };

    return {
      template: '<md-button class="md-primary md-raised" ng-click="openDialog()">Add Match</md-button>',
      restrict: 'EA',
      scope: {
        callback: '&callback'
      },
      link: function (scope) {
        scope.newMatch = getDefaultMatch();

        scope.openDialog = function() {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
              controller: FormController,
              scope: scope,
              templateUrl: 'app/ranking/addMatch/addMatch.html',
              parent: angular.element(document.body),
              clickOutsideToClose:true,
              fullscreen: useFullScreen,
              preserveScope: true
            });
          };
      }
    };
  });
