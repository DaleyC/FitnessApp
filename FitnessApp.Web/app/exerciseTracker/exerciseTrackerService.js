(function () {
    'use strict';

    angular.module('app').factory('exerciseTrackerService', Service);

    function Service() {
        var service = {
            goToState: 'base.exerciseTracker.dailyTracker'
        };
        return service;
    }

})();