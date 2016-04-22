'use strict';
(function(){

class CompetitionsShowComponent {
  constructor($http, $stateParams, $timeout, competitionModel, Restangular, $state, Auth, $mdDialog) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.selectedItem = '';
    this.Competition = competitionModel;
    this.Restangular = Restangular;
    this.$state = $state;
    this.Auth = Auth;
    this.$mdDialog = $mdDialog;
  }

  fetchMatches() {
    var ctrl = this;
    ctrl.loadingMatches = true;
    ctrl.$timeout(function(){
      ctrl.Restangular.all('matches').getList({'competition.id': ctrl.$stateParams.competitionId}).then((matches) => {
        ctrl.loadingMatches = false;
        ctrl.matches = matches;
        ctrl.everyMatchPlayed = matches.every((element) => {
          return (element.played === true);
        });
      });
    }, 650);

  }
  fetchStandings() {
    var ctrl = this;
    ctrl.loadingStandings = true;
    ctrl.$timeout(function(){
      ctrl.Restangular.all('standings').getList({'competition.id': ctrl.$stateParams.competitionId}).then((response) => {
        ctrl.loadingStandings = false;
        ctrl.standings = response;
      });
    }, 650);
  }

  $onInit() {
    this.Restangular.one('competitions', this.$stateParams.competitionId).get().then(response => {
      this.competition = response;
    });

    this.fetchMatches();
    this.fetchStandings();
  }

  querySearch (query) {
     return this.$http.get('/api/players', {params: {'name': query}}).then(response => {
       return response.data;
     });
   }

  addPlayer () {
   this.competition.players.push(this.selectedItem);
   this.selectedItem = '';
   this.searchText = '';

   this.updateCompetition();
  }

  removePlayer (player) {
    this.competition.players.splice(this.competition.players.indexOf(player), 1);

    this.updateCompetition();
  }

  updateCompetition () {
    this.competition.save().then(response => {
      this.competition = response;
    });
  }

  beginCompetition () {
    this.Restangular.one('competitions', this.$stateParams.competitionId).post('begin').then(() => {
      return this.$state.reload();
    });
  }

  confirmBeginCompetition (ev) {
    var ctrl = this;
    var confirm = this.$mdDialog.confirm()
          .title('Would you like to begin competition?')
          .textContent('Players will get randomly paired for first round of matches.')
          .ariaLabel('Begin competition?')
          .targetEvent(ev)
          .ok('Begin now')
          .cancel('Cancel');
    this.$mdDialog.show(confirm).then(function() {
      ctrl.beginCompetition();
    });
  }

  refreshMatchesAndStanding () {
    this.fetchMatches();
    this.fetchStandings();
  }

  startNewRound () {
    this.Restangular.one('competitions', this.$stateParams.competitionId).post('new-round').then(() => {
      return this.$state.reload();
    });
  }

  confirmStartNewRound (ev) {
    var ctrl = this;
    var confirm = ctrl.$mdDialog.confirm()
    .title('Would you like to start new round?')
    .textContent('You won\'t be able to edit this round matches anymore.')
    .ariaLabel('Starting new round?')
    .targetEvent(ev)
    .ok('Start new round')
    .cancel('Cancel');
    ctrl.$mdDialog.show(confirm).then(function() {
      ctrl.startNewRound();
    });
  }
}

angular.module('rankingApp')
  .component('show', {
    templateUrl: 'app/competitions/show/show.html',
    controller: CompetitionsShowComponent
  });

})();
