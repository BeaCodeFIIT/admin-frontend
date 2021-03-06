'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/dashboard/events');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.events',{
        url:'/events',
        controller: 'EventsCtrl',
        templateUrl:'events/events-list.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'events/events-list.controller.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.event-new', {
          url: '/new-event',
          controller: 'EventsCtrl',
          templateUrl: 'events/event-new.html',
          resolve: {
              loadMyFiles:function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                      name:'sbAdminApp',
                      files:[
                          'events/events-list.controller.js'
                      ]
                  })
              }
          }
      })
      .state('dashboard.event-detail',{
          url:'/event-:id',
          controller: 'EventDetailCtrl',
          templateUrl:'events/event-detail.html',
          resolve: {
              loadMyFiles:function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                      name:'sbAdminApp',
                      files:[
                          'events/event-detail.js'
                      ]
                  })
              }
          }
      })
      .state('dashboard.event-delete',{
          url:'/delete-event',
          controller: 'EventsCtrl',
          templateUrl:'events/event-delete.html',
         resolve: {
              loadMyFiles:function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                      name:'sbAdminApp',
                      files:[
                          'events/events-list.controller.js'
                      ]
                  })
              }
         }
    })
    .state('dashboard.exhibit-new',{
        url:'/exhibitNew-:id',
        controller: 'ExhibitNewCtrl',
        templateUrl:'exhibits/exhibit-new.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'sbAdminApp',
                    files:[
                        'exhibits/exhibit-new.js'
                    ]
                })
            }
        }
    })
        .state('dashboard.categories',{
            url:'/event-:id/categories',
            controller: 'CategoriesCtrl',
            templateUrl:'categories/categories-list.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:[
                            'categories/categories-list.controller.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'scripts/directives/chat/chat.js',
                            'scripts/directives/dashboard/stats/stats.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.category-new', {
            url: '/event-:id/new-category',
            controller: 'CategoriesCtrl',
            templateUrl: 'categories/category-new.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:[
                            'categories/categories-list.controller.js'
                        ]
                    })
                }
            }
        })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
    })
      .state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login'
    })
      .state('dashboard.users',{
          url:'/users',
          controller:'UsersCtrl',
          templateUrl:'users/users-list.html',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['users/users-list.controller.js']
            })
          }
        }
    })
    .state('dashboard.user-detail',{
        url:'/detail-user',
        controller: 'UsersCtrl',
        templateUrl:'users/user-detail.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'sbAdminApp',
                    files:[
                        'users/users-list.controller.js'
                    ]
                })
            }
        }
    })
    .state('dashboard.user-new',{
        url:'/new-user',
        controller: 'UsersCtrl',
        templateUrl:'users/user-new.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'sbAdminApp',
                    files:[
                        'users/users-list.controller.js'
                    ]
                })
            }
        }
    })
    .state('dashboard.user-delete',{
        url:'/delete-user',
        controller: 'UsersCtrl',
        templateUrl:'users/user-delete.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'sbAdminApp',
                    files:[
                        'users/users-list.controller.js'
                    ]
                })
            }
        }
    })
    .state('dashboard.beacons',{
        templateUrl:'beacons/beacons-list.html',
        url:'/beacons'
    })
      .state('dashboard.table',{
        templateUrl:'views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
  }]);

    
