(function () {
    'use strict';

    angular.module('app').factory('NutritionTrackerService', Service);

    function Service($http, $log) {
        var model = {
            date: new Date()
        };

        var service = {
            foodSearchOptions: foodSearchOptions,
            getFoodData: getFoodData,
            getNutritionForDay: getNutritionForDay,
            save: save
        };

        return service;

        function foodSearchOptions() {
            return {
                minimumInputLength: 3,
                query: function (query) {
                    if (query.term === '') {
                        return;
                    }
                    $http({
                        method: 'GET',
                        url: 'http://api.nal.usda.gov/ndb/search/?format=json&sort=n&max=25&offset=0&api_key=ctLmQeWtt1VxRCibpTXGrRO5talnsxCoYZglN6he&q=' + query.term
                    })
                        .then(function (data) {
                            var results = { results: [] };
                            if (data.data.list) {
                                angular.forEach(data.data.list.item, function (value, key) {
                                    value.id = value.ndbno;
                                    value.text = value.name;
                                    results.results.push(value);
                                });
                            }
                            query.callback(results);
                        })
                                .catch(function (data) {
                                    $log.warn(data);
                                });
                }
            };
        }

        function getFoodData(foodId) {
            return $http({
                method: 'GET',
                url: 'http://api.nal.usda.gov/ndb/reports/?type=b&format=json&api_key=ctLmQeWtt1VxRCibpTXGrRO5talnsxCoYZglN6he&ndbno=' + foodId
            });
        }

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