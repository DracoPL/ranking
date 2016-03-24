'use strict';

angular.module('rankingApp')
  .directive('addPlayer', function ($mdMedia, $mdDialog) {
    var getDefaultPlayer = function(){
      return {rank: 150};
    }

    var FormController = function($scope, $http) {

      $scope.closeDialog = function() {
        $mdDialog.hide();
      };

      $scope.addNewPlayer = function () {
        $http.post('/api/players', $scope.newPlayer).then(function(){
          $scope.callback();
          $scope.newPlayer = getDefaultPlayer();
          if(!$scope.addAnother){
            $mdDialog.hide();
          }
        });
      };
    }

    return {
      template: '<md-button class="md-primary md-raised" ng-click="openDialog()">Add Player</md-button>',
      restrict: 'EA',
      scope: {
        callback: '&callback'
      },
      link: function (scope, element, attrs) {
        scope.newPlayer = getDefaultPlayer();

        scope.openDialog = function() {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
              controller: FormController,
              scope: scope,
              templateUrl: 'app/ranking/addPlayer/addPlayer.html',
              parent: angular.element(document.body),
              clickOutsideToClose:true,
              fullscreen: useFullScreen,
              preserveScope: true
            });
          };
      }
    };
  });
