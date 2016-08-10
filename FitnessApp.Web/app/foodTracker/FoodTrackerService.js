(function () {
    'use strict';

    angular.module('app').factory('foodTrackerService', Service);

    function Service($q, $timeout, $http) {
        var model = {
            date: new Date(),
        }

        var service = {
            getFoodForDay: getFoodForDay
        };

        return service;

        var service = {
            getFoodForDay: getFoodForDay
        };

        return service;

        function getFoodForDay(date) {
            var model = {
                date: new Date(),
                totalCalories: 100,
                carbs: 200
            }

            return $http({
                method: 'POST',
                url: 'http://jsonplaceholder.typicode.com/posts',
                data: model
            })
        }
    }
})();