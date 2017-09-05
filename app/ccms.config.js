(function () {
    'use strict';

    angular
        .module('ccms')
        .config(routeConfiguration)
        .run(rootConfiguration)

    routeConfiguration.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

    function routeConfiguration($stateProvider, $urlRouterProvider, $httpProvider) {

        $urlRouterProvider.when('', '/oauth');
        $urlRouterProvider.when('/', '/oauth');
        /*$urlRouterProvider.when('/customer', '/attributes');
        $urlRouterProvider.when('/contact', '/attributes');*/
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: './login.html'
            })
            .state('oauth', {
                url: '/oauth',
                templateUrl: './app/oauth/oauth.html',
                controller: 'OAuthController',
                controllerAs: 'oauth'
            })
            .state('home', {
                url: '/home',
                templateUrl: './app/dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'dash'
            })
            .state('create', {
                url: '/create',
                templateUrl: './app/finegrained/finegrained.html',
                controller: 'FineGrainedController',
                controllerAs: 'fine'
            })
            .state('attributes', {
                url: '/attributes',
                templateUrl: './app/ccms-attributes/ccms.attributes.html',
                controller: 'CCMSAttributesController',
                controllerAs: 'attr'
            }).state('datasync', {
                url: '/datasync',
                templateUrl: './app/data-sync-error/data.sync.error.html',
                controller: 'DataSyncErrorController',
                controllerAs: 'sync'
            });
    };

    rootConfiguration.$inject = ['$rootScope'];

    function rootConfiguration($rootScope) {
        $rootScope.logonid = '';
        $rootScope.sessionCountDown = 5;
        $rootScope.mainMenuList = {
            home: 'home',
            attributes: 'attributes',
            datasync: 'datasync'
        }
        $rootScope.selectedMenu = 'home';
    };
})();