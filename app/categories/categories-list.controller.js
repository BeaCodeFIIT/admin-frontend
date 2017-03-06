

angular.module('sbAdminApp', ['ngResource', 'ngRoute'])
    .controller('CategoriesCtrl', ['$scope', '$resource', '$stateParams', '$window',
        function($scope, $resource, $stateParams, $window) {
            'use strict';

            //var apiUrl = 'http://team06-16.studenti.fiit.stuba.sk/beacode_dev/current/web/app.php/api';
            var apiUrl = 'http://147.175.149.218/beacode_dev/current/web/app.php/api/admin-web';

            var actions = {
                get: {
                    method: 'GET',
                    isArray: false,
                    headers: { 'deviceId': '123456' }
                },
                createCategory: {
                    method: 'POST',
                    isArray: false,
                    url: apiUrl + '/events/new',
                    headers: { 'deviceId': '123456' }
                },
            };

            var resource = $resource(apiUrl + '/events/:id', {}, actions)

            resource.get({id: $stateParams.id}).$promise.then(function (resourceData) {
                $scope.categoriesData = resourceData.data.categories;
            });

            $scope.eventId = $stateParams.id;

            $scope.addCategory = function () {
                $scope.categoriesData.push({
                    name: $scope.categoryTitle,
                    start: $scope.categoryStartDate,
                    end: $scope.categoryEndDate,
                    location: $scope.categoryLocation,
                    description: $scope.categoryDescription
                });

                var newCategory = {
                    name: $scope.categoryTitle,
                    start: $scope.categoryStartDate,
                    end: $scope.categoryEndDate,
                    locationId: '1',
                    description: $scope.categoryDescription,
                    parentId: $stateParams.id,
                    level: 1,
                }
                resource.createCategory(newCategory);

            }
            $scope.categoryTitle = '';
            $scope.categoryStartDate = '';
            $scope.categoryEndDate = '';
            $scope.categoryDescription = '';
            $scope.categoryLocation = '';













        }]);
