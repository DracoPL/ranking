'use strict';

angular.module('rankingApp')
  .directive('matchLabel', function () {
    return {
      templateUrl: 'app/ranking/matchLabel/matchLabel.html',
      restrict: 'E',
      scope: {
        rankMatch: '=',
        isHome: '='
      },
      link: function (scope) {
        scope.result = 'loose';
        if((scope.isHome && scope.rankMatch.hScore > scope.rankMatch.aScore) || (!scope.isHome && scope.rankMatch.hScore < scope.rankMatch.aScore)){
            scope.result = 'win';
        } else if (scope.rankMatch.hScore === scope.rankMatch.aScore){
          scope.result = 'draw';
        }
      }
    };
  });
