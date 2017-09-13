(function () {
    'use strict';

    angular
        .module('tambola')
        .config(tambolaConfigPhase)
        .run(tambolaRunPhase)

    tambolaConfigPhase.$inject = ['$stateProvider', '$urlRouterProvider'];

    function tambolaConfigPhase($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when('', '/home');
        $urlRouterProvider.when('/', '/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: './app/home/home.html',
                controller: 'HomeController',
                controllerAs: 'home'
            })
    };

    tambolaRunPhase.$inject = [];

    function tambolaRunPhase() {

    };
})();
