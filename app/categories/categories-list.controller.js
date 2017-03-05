

angular.module('sbAdminApp', ['ngResource', 'ngRoute'])
    .controller('CategoriesCtrl', ['$scope', '$resource', '$stateParams', '$window',
        function($scope, $resource, $stateParams, $window) {
            'use strict';

            //var apiUrl = 'http://team06-16.studenti.fiit.stuba.sk/beacode_dev/current/web/app.php/api';
            var apiUrl = 'http://147.175.149.218/beacode_dev/current/web/app.php/api';

            var actions = {
                get: {
                    method: 'GET',
                    isArray: false,
                    headers: { 'deviceId': '123456' }
                }
            };

            var resource = $resource(apiUrl + '/admin-web/events/:id', {}, actions)

            resource.get({id: $stateParams.id}).$promise.then(function (resourceData) {
                $scope.categoriesData = resourceData.data.categories;
            });













        }]);
