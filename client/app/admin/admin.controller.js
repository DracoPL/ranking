'use strict';

(function() {

class AdminController {
  constructor(User, Modal) {
    // Use the User $resource to fetch all users
    var users = User.query();

    this.users = users;

    this.delete = Modal.confirm.delete(function(user) {
      user.$remove();
      users.splice(users.indexOf(user), 1);
    });
  }
}

angular.module('rankingApp.admin')
  .controller('AdminController', AdminController);

})();
