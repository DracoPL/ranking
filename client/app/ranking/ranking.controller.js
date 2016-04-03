'use strict';
(function(){

class RankingComponent {
  constructor($http, Auth, $timeout) {
    this.$http = $http;
    this.Auth = Auth;
    this.timeout = $timeout;
    this.players = [];
  }

  fetchPlayers() {
    var ctrl = this;
    ctrl.loadingPlayers = true;
    ctrl.timeout(function(){
      ctrl.$http.get('/api/players').then(response => {
        ctrl.loadingPlayers = false;
        ctrl.players = response.data;
      });
    }, 650);
  }

  fetchMatches() {
    var ctrl = this;
    ctrl.loadingMatches = true;
    ctrl.timeout(function(){
      ctrl.$http.get('/api/matchs').then(response => {
        ctrl.loadingMatches = false;
        ctrl.matches = response.data;
      });
    }, 650);
  }

  reloadLists() {
    this.fetchPlayers();
    this.fetchMatches();
  }

  $onInit() {
    this.fetchPlayers();
    this.fetchMatches();
  }
}

angular.module('rankingApp')
  .component('ranking', {
    templateUrl: 'app/ranking/ranking.html',
    controller: RankingComponent
  });

})();
