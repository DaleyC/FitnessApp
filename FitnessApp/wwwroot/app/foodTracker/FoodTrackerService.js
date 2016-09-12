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

        function getFoodForDay(selectedDate) {
            return $http({
                method: 'POST',
                url: 'api/foodtracker/GetFoodForDay',
                data: JSON.stringify(selectedDate)
            });
        }

        function save(model) {
            return $http({
                method: 'POST',
                url: 'api/foodtracker/PostFoodForDay',
                data: model
            });
        }
    }
})();