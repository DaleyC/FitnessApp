﻿(function () {
    'use strict';

    angular.module('app').controller('NutritionTrackerController', NutritionTrackerController);

    function NutritionTrackerController(nutritionTrackerService, $scope, $timeout) {
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



        init();

        function init() {
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
        }

        function editItem(index) {
            vm.meal = angular.copy(vm.model.meals[index]);
            vm.index = index;
            vm.editing = true;
        }

        function getNutritionForDay(selectedDate) {
            var date = moment(vm.model.nutritionDate).format('MM/DD/YYYY');
            vm.getPromise = nutritionTrackerService.getNutritionForDay(date)
                .then(function (data) {
                    vm.model = data.data || vm.model;
                    vm.model.nutritionDate = moment(selectedDate).toDate();
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
                    return moment(vm.model.nutritionDate).format('MM/DD/YYYY');
                },
                function (newValue, oldValue) {
                    getNutritionForDay(newValue);
                });
        }

        function save() {
            var model = angular.copy(vm.model);
            model.nutritionDate = moment(model.nutritionDate).format('MM/DD/YYYY');
            nutritionTrackerService.save(model)
            .then(function () {
            });
        }

        function totalCalories() {
            vm.totalCal = vm.model.meals.reduce(function (total, num) {
                return total += num.calories;
            }, 0);
            vm.remainingCalories = 2000 - vm.totalCal;
        }
    }

})();