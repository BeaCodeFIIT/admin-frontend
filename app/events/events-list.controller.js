

angular.module('sbAdminApp', ['ngResource', 'ngRoute'])
  .controller('EventsCtrl', ['$scope', '$resource',
      function($scope, $resource) {
      'use strict';

      var apiUrl = 'http://team06-16.studenti.fiit.stuba.sk/beacode_dev/current/web/app.php/api/admin-web';
          //var apiUrl = 'http://147.175.149.218/beacode_dev/current/web/app.php/api';

      $scope.eventExhibits_1 = [];

      var eventExhibit_1_1 = {'name': 'Skoda octavia', 'description': 'Taka pekne skodovka', 'state': 'Aktivny'};
      var eventExhibit_1_2 = {'name': 'Bugatti Veyron', 'description': 'Celkom rychle auticko', 'state': 'Aktivny'};

      $scope.eventExhibits_1.push(eventExhibit_1_1, eventExhibit_1_2);

      $scope.events = [];


      var actions = {
          createEvent: {
              method: 'POST',
              isArray: false,
              url: apiUrl + '/events/new',
              headers: { 'deviceId': '123456' }
          },
          createExhibit: {
              method: 'POST',
              isArray: false,
              url: apiUrl + '/events/1/exhibits/new',
              headers: { 'deviceId': '123456' }
          },
          get: {
              method: 'GET',
              isArray: false,
              headers: { 'deviceId': '123456' }
          },
          update: {
              method: 'PUT',
              headers: { 'deviceId': '123456' }
          },
          addImage: {
              method: 'POST',
              isArray: false,
              url: apiUrl + '/events/:id/images/new',
              headers: { 'deviceId': '123456' }
          },
      };

      var resource = $resource(apiUrl + '/events', {}, actions)

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
              parentId: 0,
              level: 0,
          }
          resource.createEvent(newEvent);

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

  }]);
