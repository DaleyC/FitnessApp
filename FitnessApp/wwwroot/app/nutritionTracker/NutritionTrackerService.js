(function () {
    'use strict';

    angular.module('app').factory('nutritionTrackerService', Service);

    function Service($http) {
        var model = {
            date: new Date()
        };

        var service = {
            getNutritionForDay: getNutritionForDay,
            save: save
        };

        return service;

        function getNutritionForDay(selectedDate) {
            return $http({
                method: 'POST',
                url: 'api/nutritiontracker/GetNutritionForDay',
                data: JSON.stringify(selectedDate)
            });
        }

        function save(model) {
            return $http({
                method: 'POST',
                url: 'api/nutritiontracker/PostNutritionForDay',
                data: model
            });
        }
    }
})();