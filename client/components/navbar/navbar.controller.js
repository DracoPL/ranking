'use strict';

class NavbarController {
  //start-non-standard
  menu = [
    // {
    //   'title': 'Ranking',
    //   'state': 'ranking'
    // },
    {
      'title': 'Competitions',
      'state': 'competitions'
    }
  ];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('rankingApp')
  .controller('NavbarController', NavbarController);
