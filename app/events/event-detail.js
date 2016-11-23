

angular.module('sbAdminApp', ['ngResource', 'ngRoute'])
    .controller('EventDetailCtrl', ['$scope', '$resource', '$stateParams',
        function($scope, $resource, $stateParams) {
            'use strict';

            var apiUrl = 'http://team06-16.studenti.fiit.stuba.sk/beacode_dev/current/web/app.php/api';


            var actions = {
                createExhibit: {
                    method: 'POST',
                    isArray: false,
                    url: apiUrl + '/admin-web/events/1/exhibits/new',
                },
                get: {method: 'GET', isArray: false},
                update: {method: 'PUT'}
            };

            var resource = $resource(apiUrl + '/admin-web/events/:id', {}, actions)

            resource.get({id: $stateParams.id}).$promise.then(function (resourceData) {
                $scope.eventsData = resourceData.data;
            });





            $scope.eventId = $stateParams.id;






        }]);
