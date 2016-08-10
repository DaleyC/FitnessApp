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
        vm.remainingCalories = 2000;
        vm.remainingWater = 64;
        vm.totalCal = 0;
        vm.totalWater = 0;

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

        function getFoodForDay() {
            vm.getPromise = foodTrackerService.getFoodForDay(vm.date)
                .then(function (data) {
                    console.log(data.data);
                    vm.model = data;
                });
        }
    }
})();