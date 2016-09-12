(function () {
    'use strict';

    angular.module('app').controller('FoodTrackerController', FoodTrackerController);

    function FoodTrackerController(foodTrackerService, $scope,$timeout) {
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
        vm.totalCal = 0;
        vm.totalWater = 0;
        vm.save = save;



        init();

        function init() {
            $timeout(function () {
                getFoodForDay();
            });
            setUpWatches();
        }

        function addMeal(foodTrackerForm) {
            if (vm.foodTrackerForm.$invalid) {
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

        function removeItem(index) {
            vm.model.meals.splice(index, 1);
        }

        function totalCalories() {
            vm.totalCal = vm.model.meals.reduce(function (total, num) {
                return total += num.calories;
            }, 0);
            vm.remainingCalories = 2000 - vm.totalCal;
        }

        function getFoodForDay() {
            var date = moment(vm.model.nutritionDate).format('MM/DD/YYYY');
            vm.getPromise = foodTrackerService.getFoodForDay(date)
                .then(function (data) {
                    console.log(data.data);
                    vm.model = data.data || vm.model;
                    vm.model.nutritionDate = moment(vm.model.nutritionDate).toDate();
                });

            return vm.getPromise;
        }

        function save() {
            vm.model.nutritionDate = moment(vm.model.nutritionDate).format('MM/DD/YYYY');
            foodTrackerService.save(vm.model)
            .then(function () {
                console.log('SAVED');
            });
        }
    }

})();