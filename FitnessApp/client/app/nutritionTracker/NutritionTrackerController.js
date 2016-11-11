(function () {
    'use strict';

    angular.module('app').controller('NutritionTrackerController', NutritionTrackerController);

    function NutritionTrackerController(NutritionTrackerService, $scope, $timeout, $uibModal, $window, $state) {
        var vm = this;
        vm.addMeal = addMeal;
        vm.editItem = editItem;
        vm.foodSearchOptions = NutritionTrackerService.foodSearchOptions();
        vm.getFoodData = getFoodData;
        vm.getFoodInfo = getFoodInfo;
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
            today();
            $timeout(function () {
                getNutritionForDay(vm.model.nutritionDate);
            });
            setUpWatches();
        }

        angular.element($window).on('beforeunload', function (event) {
            if (vm.nutritionTrackerForm.$pristine && vm.mealsForm.$pristine) {
                return;
            }
            return 'Are you sure you want to leave? You may lose unsaved data.';
        });

        $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (vm.nutritionTrackerForm.$pristine && vm.mealsForm.$pristine) {
                return;
            }
            if (vm.allowStateChange) {
                vm.allowStateChange = false;
                return;
            }
            event.preventDefault();
            openModal(toState);
            vm.modalIsOpened = true;
        });

        function addMeal() {
            if (vm.mealsForm.$invalid || vm.nutritionTrackerForm.date.$invalid) {
                vm.mealSubmitted = true;
                return;
            }
            else if (vm.editing) {
                vm.model.meals[vm.index] = angular.copy(vm.meal);
            }
            else {
                vm.meal.IsActive = true;
                vm.model.meals.push(angular.copy(vm.meal));
            }
            totalCalories();
            vm.meal = {};
            vm.editing = false;
            vm.mealSubmitted = false;
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
                    vm.meal.calories = Math.round(parseFloat(data.data.report.food.nutrients.find(function (food) {
                        return food.name === 'Energy';
                    }).value));
                    vm.meal.fat = Math.round(parseFloat(data.data.report.food.nutrients.find(function (food) {
                        return food.name === 'Total lipid (fat)';
                    }).value));
                    vm.meal.carbs = Math.round(parseFloat(data.data.report.food.nutrients.find(function (food) {
                        return food.name === 'Carbohydrate, by difference';
                    }).value));
                    vm.meal.protein = Math.round(parseFloat(data.data.report.food.nutrients.find(function (food) {
                        return food.name === 'Protein';
                    }).value));
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

        function openModal(newValue, oldValue) {
            if (vm.modalIsOpened) {
                return;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                controllerAs: 'vm',
                templateUrl: 'myModalContent.html',
                size: 'sm',
                controller: function ($uibModalInstance) {
                    var vm = this;
                    vm.leave = function () {
                        $uibModalInstance.close();
                    };
                    vm.stay = function () {
                        $uibModalInstance.dismiss();
                    };
                }
            });
            modalInstance.result
              .then(function () {
                  vm.nutritionTrackerForm.$setPristine();
                  vm.mealsForm.$setPristine();
                  if (vm.allowDateChange) {
                      vm.allowDateChange = false;
                      return getNutritionForDay(newValue);
                  }
                  else {
                      vm.allowStateChange = true;
                      $state.go(newValue);
                  }
              })
            .catch(function () {
                if (vm.allowDateChange) {
                    vm.model.nutritionDate = oldValue;
                }
            })
            .finally(function () {
                vm.modalIsOpened = false;
            });
        }

        function removeItem(index) {
            vm.model.meals.splice(index, 1);
        }

        function save() {
            if (vm.nutritionTrackerForm.date.$invalid) {
                return;
            }
            var model = angular.copy(vm.model);
            NutritionTrackerService.save(model)
            .then(function () {
                vm.nutritionTrackerForm.$setPristine();
                vm.mealsForm.$setPristine();
            });
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
                    if (vm.nutritionTrackerForm.date.$invalid) {
                        return;
                    }
                    if (vm.allowDateChange) {
                        return vm.allowDateChange = false;
                    }
                    if (vm.nutritionTrackerForm.water.$dirty || vm.mealsForm.$dirty) {
                        vm.allowDateChange = true;
                        return openModal(newValue, oldValue);
                    }
                    getNutritionForDay(newValue);
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