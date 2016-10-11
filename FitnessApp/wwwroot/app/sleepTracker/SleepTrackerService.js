(function () {
    'use strict';

    angular.module('app').factory('sleepTrackerService', Service);

    function Service($http) {

        var service = {
            deleteDataForDate: deleteDataForDate,
            getSleepForDay: getSleepForDay,
            save: save
        };

        return service;

        function deleteDataForDate(date) {
            return $http({
                method: 'POST',
                url: 'api/sleeptracker/DeleteDataForDate',
                data: JSON.stringify(date)
            })
        }

        function getSleepForDay() {
            return $http({
                method: 'POST',
                url: 'api/sleeptracker/GetSleepForDay'
            });
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