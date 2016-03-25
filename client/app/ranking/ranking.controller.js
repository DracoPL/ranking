'use strict';
(function(){

class RankingComponent {
  constructor($http, Auth) {
    this.$http = $http;
    this.Auth = Auth;
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
