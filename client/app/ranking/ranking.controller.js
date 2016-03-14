'use strict';
(function(){

class RankingComponent {
  constructor($http) {
    this.$http = $http;

    this.message = 'Hello';
    this.players = [];
  }

  $onInit() {
    this.$http.get('/api/players').then(response => {
      this.players = response.data;
    })
  }
}

angular.module('rankingApp')
  .component('ranking', {
    templateUrl: 'app/ranking/ranking.html',
    controller: RankingComponent
  });

})();
