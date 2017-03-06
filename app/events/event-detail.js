

angular.module('sbAdminApp', ['ngResource', 'ngRoute'])
    .controller('EventDetailCtrl', ['$scope', '$resource', '$stateParams', '$route',
        function($scope, $resource, $stateParams, $route) {
            'use strict';

            var apiUrl = 'http://team06-16.studenti.fiit.stuba.sk/beacode_dev/current/web/app.php/api/admin-web';

            //var apiUrl = 'http://147.175.149.218/beacode_dev/current/web/app.php/api';



            var actions = {
                createExhibit: {
                    method: 'POST',
                    isArray: false,
                    url: apiUrl + '/events/1/exhibits/new',
                    headers: { 'deviceId': '123456' }
                },
                getEventData: {
                    method: 'GET',
                    isArray: false,
                    headers: { 'deviceId': '123456' }
                },
                update: {method: 'PUT'},
                getBeaconsList: {
                    method: 'GET',
                    isArray: false,
                    url: apiUrl + '/beacons',
                    headers: { 'deviceId': '123456' }
                },
                setExhibitBeacon: {
                    method: 'PATCH',
                    isArray: false,
                    url: apiUrl + '/beacons/:id',
                    headers: { 'deviceId': '123456' }
                },
                getEventExhibits: {
                    method: 'GET',
                    isArray: false,
                    url: apiUrl + '/events/:id/exhibits',
                    headers: { 'deviceId': '123456' }
                }
            };

            var resource = $resource(apiUrl + '/events/:id', {}, actions)

            resource.getEventData({id: $stateParams.id}).$promise.then(function (resourceData) {
                $scope.eventsData = resourceData.data;
            });

            resource.getEventExhibits({id: $stateParams.id}).$promise.then(function (resourceData) {
                $scope.exhibits = resourceData.data;
            });

            $scope.eventId = $stateParams.id;


            resource.getBeaconsList().$promise.then(function (beaconsData) {
                $scope.beaconsList= beaconsData.data;
            });
            $scope.selectedBeacon = 'krasny';



            $scope.selectBeacon = function (exhibitId, beacon) {
                console.log(exhibitId);
                console.log(beacon.id);
                $scope.updateObjectBeacons = [];
                var updateObjectBeacon = {
                    'op': 'replace',
                    'path': '/exhibitId',
                    'value': exhibitId,
                }
                $scope.updateObjectBeacons.push(updateObjectBeacon);

                resource.setExhibitBeacon({id: beacon.id}, $scope.updateObjectBeacons);
                resource.getBeaconsList().$promise.then(function (beaconsData) {
                    $scope.beaconsList= beaconsData.data;
                });
                $route.reload();
            }



        }]);
