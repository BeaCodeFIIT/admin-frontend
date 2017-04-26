

angular.module('sbAdminApp', ['ngResource', 'ngRoute'])
    .controller('EventDetailCtrl', ['$scope', '$resource', '$stateParams', '$route', '$window',
        function($scope, $resource, $stateParams, $route, $window) {
            'use strict';

            var apiUrl = 'http://team06-16.studenti.fiit.stuba.sk/beacode_dev/current/web/app.php/api/admin-web';
            $scope.apiImgUrl = 'http://147.175.149.218/beacode_dev'

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
                },
                uploadImages: {
                    method: 'POST',
                    isArray: false,
                    url: apiUrl + '/events/:eventId/exhibits/:exhibitId/images/new',
                    headers: { 'deviceId': '123456', 'Content-Type': undefined },
                },
                deleteExhibit: {
                    method: 'DELETE',
                    isArray: false,
                    url: apiUrl + '/events/:eventId/exhibits/:exhibitId',
                    headers: { 'deviceId': '123456', 'Content-Type': undefined },
                    transformRequest: angular.identity
                },
                setExhibitNotification: {
                    method: 'PATCH',
                    isArray: false,
                    url: apiUrl + '/events/:eventId/exhibits/:exhibitId',
                    headers: { 'deviceId': '123456' }
                },
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

            $scope.uploadImage = function(exhibitId) {
                var fd = new FormData();
                var f = document.getElementById('file'+exhibitId).files[0],
                    r = new FileReader();
                fd.append('image', f);
                resource.uploadImages({eventId: $scope.eventId, exhibitId: exhibitId}, fd);
            }

            $scope.deleteExhibit = function(exhibitId) {
                resource.deleteExhibit({eventId: $scope.eventId, exhibitId:exhibitId})
                    .$promise.then(function () {
                    $window.location.reload();
                });
            }

            $scope.addNotification = function(exhibitId, exhibitNotification) {
                $scope.updateObjectExhibits = [];
                var updateObjectExhibit = {
                    op: 'replace',
                    path: '/pushNotification',
                    value: exhibitNotification,
                }
                $scope.updateObjectExhibits.push(updateObjectExhibit);
                resource.setExhibitNotification({eventId: $scope.eventId, exhibitId: exhibitId}, $scope.updateObjectExhibits);
            }


        }]);
