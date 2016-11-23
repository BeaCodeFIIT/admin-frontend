'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('UsersCtrl', function($scope,$position) {

    $scope.users= new Array();

    var user1 = {'id':'01', 'firstname': 'Andrej', 'surname': 'Žlnka'};
    var user2 = {'id':'02', 'firstname': 'Marek', 'surname': 'Bruchatý'};
    var user3 = {'id':'03', 'firstname': 'Sandra', 'surname': 'Kostova'};
    var user4 = {'id':'04', 'firstname': 'Peter', 'surname': 'Augustín'};

    $scope.users.push(user1, user2, user3, user4);



  });
