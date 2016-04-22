'use strict';

angular.module('rankingApp')
  .directive('matchLabel', function () {
    return {
      templateUrl: 'app/competitions/matchLabel/matchLabel.html',
      restrict: 'E',
      scope: {
        matchObject: '=',
        isHome: '='
      },
      link: function (scope) {
        scope.result = 'loose';
        if((scope.isHome && scope.matchObject.home.score.points > scope.matchObject.away.score.points) || (!scope.isHome && scope.matchObject.home.score.points < scope.matchObject.away.score.points)){
            scope.result = 'win';
        } else if (scope.matchObject.home.score.points === scope.matchObject.away.score.points){
          scope.result = 'draw';
        }
      }
    };
  });
