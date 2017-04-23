

angular.module('sbAdminApp', ['ngResource', 'ngRoute'])
    .controller('ExhibitNewCtrl', ['$scope', '$resource', '$stateParams', '$window',
        function($scope, $resource, $stateParams, $window) {
            'use strict';

            //var apiUrl = 'http://team06-16.studenti.fiit.stuba.sk/beacode_dev/current/web/app.php/api';
            var apiUrl = 'http://147.175.149.218/beacode_dev/current/web/app.php/api';


            var actions = {
                createExhibit: {
                    method: 'POST',
                    isArray: false,
                    headers: { 'deviceId': '123456' }
                }

            }
            var resource = $resource(apiUrl + '/admin-web/events/:id/exhibits/new', {}, actions)

            $scope.addExhibit = function() {
                var newExhibit = {
                    name: $scope.exhibitName,
                    description: $scope.exhibitDescription,
                    pushNotification: $scope.exhibitPushNotification,
                }
                resource.createExhibit({id: $stateParams.id},newExhibit);
                $window.location.href = 'dashboard.event-detail({id: $stateParams.id})';
            }

            $scope.eventId = $stateParams.id;













        }]);
