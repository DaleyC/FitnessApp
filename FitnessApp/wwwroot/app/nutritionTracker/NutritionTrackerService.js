(function () {
    'use strict';

    angular.module('app').factory('NutritionTrackerService', Service);

    function Service($http) {
        var model = {
            date: new Date()
        };

        var service = {
            getNutritionForDay: getNutritionForDay,
            save: save,
            foodSearchOptions: foodSearchOptions
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
        function foodSearchOptions() {
            return {
                minimumInputLength: 3,
                ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
                    url: "https://api.github.com/search/repositories",

                    data: function (term, page) {
                        return {
                            q: term, // search term
                        };
                    },
                    results: function (data, page) { // parse the results into the format expected by Select2.
                        // since we are using custom formatting functions we do not need to alter the remote JSON data
                        return { results: data.items };
                    }
                }
            }
        }
    }
})();