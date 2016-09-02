(function () {
    'use strict';

    angular.module('app').factory('foodTrackerService', Service);

    function Service($q, $timeout, $http) {
        var model = {
            date: new Date(),
        }

        var service = {
            getFoodForDay: getFoodForDay,
            save: save
        };

        return service;

        function getFoodForDay(date) {
            return $http({
                method: 'GET',
                url: 'api/values'
            });
        }

        function save(model) {
            return $http({
                method: 'POST',
                url: 'api/values',
                data: model
            });
        }
    }
})();