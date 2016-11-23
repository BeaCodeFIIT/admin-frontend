'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
  .directive('sidebar',['$location',function() {
    return {
      templateUrl:'scripts/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'dashboard';
        $scope.collapseVarUsers = 0;
        $scope.collapseVarEvents = 0;
        $scope.collapseVarBeacons = 0;
        $scope.multiCollapseVar = 0;
        
        $scope.checkUsers = function(x){
          
          if(x==$scope.collapseVarUsers)
            $scope.collapseVarUsers = 0;
          else
            $scope.collapseVarUsers = x;
        };

        $scope.checkEvents = function(x){

          if(x==$scope.collapseVarEvents)
            $scope.collapseVarEvents = 0;
          else
            $scope.collapseVarEvents = x;
        };

        $scope.checkBeacons = function(x){

          if(x==$scope.collapseVarBeacons)
            $scope.collapseVarBeacons = 0;
          else
            $scope.collapseVarBeacons = x;
        };
        
        $scope.multiCheck = function(y){
          
          if(y==$scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };
      }
    }
  }]);
