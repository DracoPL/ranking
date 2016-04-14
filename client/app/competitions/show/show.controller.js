'use strict';
(function(){

class CompetitionsShowComponent {
  constructor($http, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.$http.get('/api/competitions/' + this.$stateParams.competitionId).then(response => {
      this.competition = response.data;
      console.log(this.competition);
    });
  }
}

angular.module('rankingApp')
  .component('show', {
    templateUrl: 'app/competitions/show/show.html',
    controller: CompetitionsShowComponent
  });

})();
