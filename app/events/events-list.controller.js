

angular.module('sbAdminApp', ['ngResource', 'ngRoute'])
  .controller('EventsCtrl', ['$scope', '$resource',
      function($scope, $resource) {
      'use strict';

      var apiUrl = 'http://team06-16.studenti.fiit.stuba.sk/beacode_dev/current/web/app.php/api';

      $scope.eventExhibits_1 = [];

      var eventExhibit_1_1 = {'name': 'Skoda octavia', 'description': 'Taka pekne skodovka', 'state': 'Aktivny'};
      var eventExhibit_1_2 = {'name': 'Bugatti Veyron', 'description': 'Celkom rychle auticko', 'state': 'Aktivny'};

      $scope.eventExhibits_1.push(eventExhibit_1_1, eventExhibit_1_2);

      $scope.events = [];




      var actions = {
          create: {
              method: 'POST',
              isArray: false,
              url: apiUrl + '/admin-web/events/new',
          },
          createExhibit: {
              method: 'POST',
              isArray: false,
              url: apiUrl + '/admin-web/events/1/exhibits/new',
          },
          get: {method: 'GET', isArray: false},
          update: {method: 'PUT'}
      };

      var resource = $resource(apiUrl + '/admin-web/events', {}, actions)

      resource.get().$promise.then(function (resourceData) {
          $scope.eventsData = resourceData.data;
      });



      $scope.addEvent = function () {
          $scope.eventsData.push({
              name: $scope.eventTitle,
              start: $scope.eventStartDate,
              end: $scope.eventEndDate,
              location: $scope.eventLocation,
              description: $scope.eventDescription
          });

          var newEvent = {
              name: $scope.eventTitle,
              start: $scope.eventStartDate,
              end: $scope.eventEndDate,
              locationId: '1',
              description: $scope.eventDescription,
          }
          resource.create(newEvent);

      }
      $scope.eventTitle = '';
      $scope.eventStartDate = '';
      $scope.eventEndDate = '';
      $scope.eventDescription = '';
      $scope.eventLocation = '';

      $scope.addExhibit = function() {
              var newExhibit = {
              name: $scope.exhibitName,
              description: $scope.exhibitDescription,
          }
          resource.createExhibit(newExhibit);

      }







      //$scope.eventResource = resource.get();



      /*eventResource.promise.then(function(data){
           $scope.eventData = data;
      });*/



  }]);
