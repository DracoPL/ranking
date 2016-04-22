'use strict';

angular.module('rankingApp')
  .directive('addPlayer', function ($mdMedia, $mdDialog) {
    var getDefaultPlayer = function(){
      return {rank: 150};
    };

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
        }, (err) => {
          console.log(err);
          $scope.message = "Player with this name already exists.";
        });
      };
    };

    return {
      template: '<a ng-click="openDialog()" href-void>Create new Player</a>',
      restrict: 'EA',
      scope: {
        callback: '&callback'
      },
      link: function (scope) {
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
