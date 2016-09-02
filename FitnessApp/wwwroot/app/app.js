(function () {
    'use strict';

    angular.module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'offClick']);

    angular.module('app').config(config);
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('base', {
                url: "/",
                templateUrl: "app/base/base.html"
            })
            .state('base.exerciseTracker', {
                url: "exercise-tracker",
                templateUrl: "app/exerciseTracker/exerciseTracker.html"
            })
            .state('base.exerciseTracker.dailyTracker', {
                url: "/daily-tracker",
                templateUrl: "app/exerciseTracker/dailyExerciseTracker/dailyTracker.html"
            })
            .state('base.exerciseTracker.history', {
                url: "/exercise-history",
                templateUrl: "app/exerciseTracker/exerciseHistory/history.html"
            })
            .state('base.foodTracker', {
                url: "food-tracker",
                templateUrl: "app/foodTracker/foodTracker.html"
            })
            .state('base.home', {
                url: "home",
                templateUrl: "app/home/home.html"
            })
            .state('base.sleepTracker', {
                url: "sleep-tracker",
                templateUrl: "app/sleepTracker/sleepTracker.html"
            })
    }
})();