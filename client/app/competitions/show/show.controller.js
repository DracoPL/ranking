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
    this.selectedPlayerInMatch = null;
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
   var ctrl = this;

   var hasDuplicates = ctrl.competition.players.some((element) => {
     return (element.name === ctrl.selectedItem.name);
   });

   if (hasDuplicates) {
     ctrl.$mdDialog.show(
      ctrl.$mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Player [' + this.selectedItem.name + '] is already added.')
        .ariaLabel('This player is already added.')
        .ok('Got it!')
    );
   } else {
     ctrl.competition.players.push(ctrl.selectedItem);
     ctrl.selectedItem = '';
     ctrl.searchText = '';

     ctrl.updateCompetition();
   }
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

  selectPlayer (match, isHome, playerName) {
    this.selectedPlayerInMatch = {
      match: match,
      isHome: isHome,
      playerName: playerName
    };
  }

  replacePlayers (match, isHome) {
    var ctrl = this;

    if (ctrl.selectedPlayerInMatch) {
      var selectedPlayerInMatchCopy = {};
      angular.copy(ctrl.selectedPlayerInMatch, selectedPlayerInMatchCopy);

      //Yeah, this sux to read ...
      if (ctrl.selectedPlayerInMatch.isHome && isHome) {
        ctrl.selectedPlayerInMatch.match.home = angular.copy(match.home);
      } else if (ctrl.selectedPlayerInMatch.isHome && !isHome) {
        ctrl.selectedPlayerInMatch.match.home = angular.copy(match.away);
      } else if (!ctrl.selectedPlayerInMatch.isHome && isHome) {
        ctrl.selectedPlayerInMatch.match.away = angular.copy(match.home);
      } else if (!ctrl.selectedPlayerInMatch.isHome && !isHome) {
        ctrl.selectedPlayerInMatch.match.away = angular.copy(match.away);
      }

      ctrl.selectedPlayerInMatch.match.save().then(response => {
        console.log(response);
      });

      if (isHome && selectedPlayerInMatchCopy.isHome) {
        match.home = angular.copy(selectedPlayerInMatchCopy.match.home);
      } else if (!isHome && selectedPlayerInMatchCopy.isHome) {
        match.away = angular.copy(selectedPlayerInMatchCopy.match.home);
      } else if (isHome && !selectedPlayerInMatchCopy.isHome) {
        match.home = angular.copy(selectedPlayerInMatchCopy.match.away);
      } else if (!isHome && !selectedPlayerInMatchCopy.isHome) {
        match.away = angular.copy(selectedPlayerInMatchCopy.match.away);
      }

      match.save().then(response => {
        console.log(response);
      });

      ctrl.selectedPlayerInMatch = null;
    }
  }

  confirmReplacePlayers (match, isHome, playerName) {
    var ctrl = this;
    var confirm = ctrl.$mdDialog.confirm()
    .title('Confirm players replacing')
    .textContent('Replace [' + ctrl.selectedPlayerInMatch.playerName + '] with [' + playerName + '] ?')
    .ariaLabel('Replace players?')
    .ok('Replace')
    .cancel('Cancel');
    ctrl.$mdDialog.show(confirm).then(function() {
      ctrl.replacePlayers(match, isHome);
    });
  }
}

angular.module('rankingApp')
  .component('show', {
    templateUrl: 'app/competitions/show/show.html',
    controller: CompetitionsShowComponent
  });

})();
