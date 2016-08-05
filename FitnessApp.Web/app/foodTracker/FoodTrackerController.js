(function () {
    'use strict';

    angular.module('app').controller('FoodTrackerController', FoodTrackerController);

    function FoodTrackerController(FoodTrackerService) {
        var vm = this;
        vm.calories = 0;
        vm.remainingCalories = 2000;
        vm.water = 0;
        vm.remainingWater = 64;
        vm.selectedDate = 'Aug 04, 2016';


        init();
        function init() {
            getFoodForDay();
        }

        function getFoodForDay() {
            vm.getPromise = FoodTrackerService.getFoodForDay(vm.date)
                .then(function (data) {
                    console.log(data.data);
                    vm.model = data;
                });
        }
    }
})();