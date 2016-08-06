(function () {
    'use strict';

    angular.module('app').controller('FoodTrackerController', FoodTrackerController);

    function FoodTrackerController(foodTrackerService) {
        var vm = this;
        vm.calories = 0;
        vm.remainingCalories = 2000;
        vm.water = 0;
        vm.remainingWater = 64;
        init();

        function init() {
            getFoodForDay();
        }

        function getFoodForDay() {
            vm.getPromise = foodTrackerService.getFoodForDay(vm.date)
                .then(function (data) {
                    console.log(data.data);
                    vm.model = data;
                });
        }

    }
})();