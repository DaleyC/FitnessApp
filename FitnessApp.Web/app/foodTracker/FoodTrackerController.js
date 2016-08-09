(function () {
    'use strict';

    angular.module('app').controller('FoodTrackerController', FoodTrackerController);

    function FoodTrackerController(foodTrackerService, $scope) {
        var vm = this;
        vm.addMeal = addMeal;
        vm.meal = {};
        vm.model = {};
        vm.model.meals = [];
        vm.model.water = 0;
        vm.totalCal = 0;
        vm.totalWater = 0;
        vm.remainingCalories = 2000;
        vm.remainingWater = 64;

        init();

        function init() {
            setUpWatches();
        }

        function addMeal(foodTrackerForm) {
            if (vm.foodTrackerForm.$invalid) {
                vm.submitted = true;
                return;
            }
            var savedMeal = angular.copy(vm.meal);
            vm.model.meals.push(savedMeal);
            totalCalories();
            vm.meal = {};
            vm.submitted = false;
        }
        function setUpWatches() {
            $scope.$watch(
                function () {
                    return vm.model.water;
                },
                function (newValue, oldValue) {
                    vm.totalWater = vm.model.water * 8;
                    vm.remainingWater = 64 - vm.totalWater;

                }
                );
        }
        function totalCalories() {
            vm.totalCal = vm.model.meals.reduce(function (total, num) {
                return total += num.calories;
            }, 0);

            vm.remainingCalories = vm.remainingCalories - vm.totalCal;
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