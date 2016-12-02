

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
                update: {method: 'PUT'},
                getBeaconsList: {
                    method: 'GET',
                    isArray: false,
                    url: apiUrl + '/admin-web/beacons',
                },
                setExhibitBeacon: {
                    method: 'PATCH',
                    isArray: false,
                    url: apiUrl + '/admin-web/beacons/:id',
                }
            };

            var resource = $resource(apiUrl + '/admin-web/events/:id', {}, actions)

            resource.get({id: $stateParams.id}).$promise.then(function (resourceData) {
                $scope.eventsData = resourceData.data;
            });

            $scope.eventId = $stateParams.id;


            resource.getBeaconsList().$promise.then(function (beaconsData) {
                $scope.beaconsList= beaconsData.data;
            });
            $scope.selectedBeacon = 'krasny';



            $scope.selectBeacon = function (exhibitId, beacon) {
                console.log(exhibitId);
                console.log(beacon.id);
                $scope.updateObjectBeacon = {
                    'op': 'replace',
                    'path': '/exhibitId',
                    'value': exhibitId,
                }
                resource.setExhibitBeacon({id: beacon.id}, $scope.updateObjectBeacon)
            }



        }]);
