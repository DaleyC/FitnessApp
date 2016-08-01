(function () {
    'use strict';

    angular.module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate']);

    angular.module('app').config(config);
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('base', {
                url: "/",
                templateUrl: "app/base/base.html"
            })
            .state('base.foodTracker', {
                url: "food-tracker",
                templateUrl: "app/foodTracker/foodTracker.html"
            })
    }
})();