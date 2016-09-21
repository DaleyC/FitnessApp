(function () {
    'use strict';

    angular.module('app').factory('sleepTrackerService', Service);

    function Service($http) {
        var model = {
            date: new Date()
        };

        var service = {
            getSleepForDay: getSleepForDay,
            save: save,
            removeDate: removeDate
        };

        return service;

        function getSleepForDay() {
            return $http({
                method: 'POST',
                url: 'api/sleeptracker/GetSleepForDay'
            });
        }
        function removeDate(date) {
            return $http({
                method: 'POST',
                url: 'api/sleeptracker/RemoveDate',
                data: JSON.stringify(date)
            })
        }

        function save(model) {
            return $http({
                method: 'POST',
                url: 'api/sleeptracker/PostSleepForDay',
                data: model
            });
        }
    }
})();