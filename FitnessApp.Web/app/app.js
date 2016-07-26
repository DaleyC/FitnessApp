(function () {
    'use strict';

    angular.module('app', ['ui.router', 'ui.bootstrap']);

    angular.module('app').config(config);
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('base', {
                url: "/",
                templateUrl: "app/base/baseController.html"
            })
    }
})();