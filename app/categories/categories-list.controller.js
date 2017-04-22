

angular.module('sbAdminApp', ['ngResource', 'ngRoute'])
    .controller('CategoriesCtrl', ['$scope', '$resource', '$stateParams', '$window',
        function($scope, $resource, $stateParams, $window) {
            'use strict';

            //var apiUrl = 'http://team06-16.studenti.fiit.stuba.sk/beacode_dev/current/web/app.php/api';
            var apiUrl = 'http://147.175.149.218/beacode_dev/current/web/app.php/api/admin-web';
            $scope.apiImgUrl = 'http://147.175.149.218/beacode_dev'

            $scope.categoriesData = new Array();

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
                uploadImages: {
                    method: 'POST',
                    isArray: false,
                    url: apiUrl + '/events/:id/images/new',
                    headers: { 'deviceId': '123456', 'Content-Type': undefined },
                    transformRequest: angular.identity
                },
                uploadMap: {
                    method: 'POST',
                    isArray: false,
                    url: apiUrl + '/events/:id/images/new?objectType=event-map',
                    headers: { 'deviceId': '123456', 'Content-Type': undefined },
                    transformRequest: angular.identity
                },
                parseBeaconsFromMap: {
                    method: 'PUT',
                    url: apiUrl + '/events/2/parse-beacon-svg',
                    headers: { 'deviceId': '123456' }
                },
                deleteCategory: {
                    method: 'DELETE',
                    isArray: false,
                    url: apiUrl + '/events/:categoryId',
                    headers: { 'deviceId': '123456', 'Content-Type': undefined },
                    transformRequest: angular.identity
                },
            };


            var resource = $resource(apiUrl + '/events/:id', {}, actions)

            resource.get({id: $stateParams.id}).$promise.then(function (resourceData) {
                $scope.eventData = resourceData.data;
            });

            $scope.eventId = $stateParams.id;

            $scope.addCategory = function () {
               /* $scope.categoriesData.push({
                    name: $scope.categoryTitle,
                    start: $scope.categoryStartDate,
                    end: $scope.categoryEndDate,
                    location: $scope.categoryLocation,
                    description: $scope.categoryDescription
                });
*/
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

            $scope.uploadImage = function() {
                var fd = new FormData();
                var f = document.getElementById('file').files[0],
                    r = new FileReader();
                fd.append('image', f);
                resource.uploadImages({id: $stateParams.id}, fd);
            }

            $scope.uploadMap = function() {
                var fd = new FormData();
                var f = document.getElementById('map').files[0],
                    r = new FileReader();
                fd.append('image', f);
                resource.uploadMap({id: $stateParams.id}, fd);
            }

            $scope.parseBeacons = function() {
                resource.parseBeaconsFromMap();
            }

            $scope.deleteCategory = function(categoryId) {
                resource.deleteCategory({categoryId: categoryId})
                    .$promise.then(function () {
                    $window.location.reload();
                });
            }










        }]);
