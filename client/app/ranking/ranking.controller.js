'use strict';
(function(){

class RankingComponent {
  constructor($http) {
    this.$http = $http;
    this.players = [];
  }

  fetchPlayers() {
    this.$http.get('/api/players').then(response => {
      this.players = response.data;
    });
  }

  $onInit() {
    this.fetchPlayers();
  }
}

angular.module('rankingApp')
  .component('ranking', {
    templateUrl: 'app/ranking/ranking.html',
    controller: RankingComponent
  });

})();
