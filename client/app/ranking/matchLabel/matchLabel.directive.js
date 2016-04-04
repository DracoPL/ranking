'use strict';

angular.module('rankingApp')
  .directive('matchLabel', function () {
    return {
      templateUrl: 'app/ranking/matchLabel/matchLabel.html',
      restrict: 'E',
      scope: {
        rankMatch: "=",
        isHome: "="
      },
      link: function (scope, element, attrs) {
        console.log(scope.rankMatch);
        scope.result = 'loose';
        if((scope.isHome && scope.rankMatch.h_score > scope.rankMatch.a_score)
          || (!scope.isHome && scope.rankMatch.h_score < scope.rankMatch.a_score)){
            scope.result = 'win';
        } else if (scope.rankMatch.h_score == scope.rankMatch.a_score){
          scope.result = 'draw';
        }
      }
    };
  });
