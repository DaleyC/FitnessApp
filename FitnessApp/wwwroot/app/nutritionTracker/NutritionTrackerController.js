(function () {
    'use strict';

    angular.module('app').controller('NutritionTrackerController', NutritionTrackerController);

    function NutritionTrackerController(NutritionTrackerService, $scope, $timeout) {
        var vm = this;
        vm.addMeal = addMeal;
        vm.editItem = editItem;
        vm.meal = {};
        vm.model = {};
        vm.model.meals = [];
        vm.model.water = 0;
        vm.remainingCalories = 2000;
        vm.remainingWater = 64;
        vm.removeItem = removeItem;
        vm.save = save;
        vm.totalCal = 0;
        vm.totalWater = 0;
        vm.foodSearchOptions = NutritionTrackerService.foodSearchOptions();
        vm.getFoodInfo = getFoodInfo;
        vm.getFoodData = getFoodData;

        init();

        function init() {
            today();
            $timeout(function () {
                getNutritionForDay(vm.model.nutritionDate);
            });
            setUpWatches();
        }

        function addMeal(nutritionTrackerForm) {
            if (vm.nutritionTrackerForm.$invalid) {
                vm.submitted = true;
                return;
            }
            else if (vm.editing) {
                vm.model.meals[vm.index] = angular.copy(vm.meal);
            }
            else {
                vm.model.meals.push(angular.copy(vm.meal));
            }
            totalCalories();
            vm.meal = {};
            vm.editing = false;
            vm.submitted = false;
            vm.foodSelection = null;
        }

        function editItem(index) {
            vm.meal = angular.copy(vm.model.meals[index]);
            vm.index = index;
            vm.editing = true;
            vm.foodSelection = {
                id: null,
                text: vm.meal.foodItem
            };
        }
        function getFoodData(foodId) {
            vm.getPromise = NutritionTrackerService.getFoodData(foodId)
                .then(function (data) {
                    vm.meal.calories = Math.round(parseFloat(data.data.report.food.nutrients[0].value));
                    vm.meal.fat = Math.round(parseFloat(data.data.report.food.nutrients[2].value));
                    vm.meal.carbs = Math.round(parseFloat(data.data.report.food.nutrients[3].value));
                    vm.meal.protein = Math.round(parseFloat(data.data.report.food.nutrients[1].value));
                });
            return vm.getPromise;
        }

        function getFoodInfo() {
            if (!vm.foodSelection) {
                return;
            }
            vm.meal.foodItem = vm.foodSelection.name;
            vm.getFoodData(vm.foodSelection.id);
            vm.foodItemReq = false;
        }

        function getNutritionForDay(selectedDate) {
            var date = vm.model.nutritionDate;
            vm.getPromise = NutritionTrackerService.getNutritionForDay(date)
                .then(function (data) {
                    vm.model = data.data || vm.model;
                    vm.model.nutritionDate = selectedDate;
                    totalCalories();
                });
            return vm.getPromise;
        }

        function removeItem(index) {
            vm.model.meals.splice(index, 1);
        }

        function setUpWatches() {
            $scope.$watch(
                function () {
                    return vm.model.water;
                },
                function (newValue, oldValue) {
                    vm.totalWater = vm.model.water * 8;
                    vm.remainingWater = 64 - vm.totalWater;
                });

            $scope.$watch(
                function () {
                    return vm.model.nutritionDate;
                },
                function (newValue, oldValue) {
                    getNutritionForDay(newValue);
                });
        }

        function save() {
            var model = angular.copy(vm.model);
            NutritionTrackerService.save(model)
            .then(function () {
            });
        }

        function today() {
            vm.model.nutritionDate = new Date();
        }

        function totalCalories() {
            vm.totalCal = vm.model.meals.reduce(function (total, num) {
                return total += num.calories;
            }, 0);
            vm.remainingCalories = 2000 - vm.totalCal;
        }
    }

})();