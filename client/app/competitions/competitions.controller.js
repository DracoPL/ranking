'use strict';
(function(){

class CompetitionsComponent {
  constructor($http, $timeout) {
    this.$http = $http;
    this.timeout = $timeout;
    this.competitions = [];
  }

  fetchCompetitions() {
    var ctrl = this;
    ctrl.loadingCompetitions = true;
    ctrl.timeout(function(){
      ctrl.$http.get('/api/competitions').then(response => {
        ctrl.loadingCompetitions = false;
        ctrl.competitions = response.data;
      });
    }, 650);
  }

  $onInit() {
    this.fetchCompetitions();
  }
}

angular.module('rankingApp')
  .component('competitions', {
    templateUrl: 'app/competitions/competitions.html',
    controller: CompetitionsComponent
  });

})();
