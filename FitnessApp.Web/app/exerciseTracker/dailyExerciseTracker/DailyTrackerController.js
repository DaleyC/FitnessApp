(function () {
    'use strict';

    angular.module('app').controller('DailyTrackerController', DailyTrackerController);

    function DailyTrackerController(exerciseTrackerService, $state) {
        var vm = this;

        vm.addExercise = addExercise;
        vm.editItem = editItem;
        vm.exercise = {};
        vm.model = {};
        vm.model.exerciseArr = [];
        vm.removeItem = removeItem;

        init();

        function init() {
            exerciseTrackerService.goToState = $state.current.name;
        }

        function addExercise() {
            if (vm.dailyTrackerForm.$invalid) {
                vm.submitted = true;
                return;
            }
            else if (vm.editing) {
                vm.model.exerciseArr[vm.index] = angular.copy(vm.exercise);
            }
            else {
                vm.model.exerciseArr.push(angular.copy(vm.exercise));
            }
            vm.exercise = {};
            vm.submitted = false;
            vm.editing = false;
        }
        function editItem(index) {
            vm.exercise = angular.copy(vm.model.exerciseArr[index]);
            vm.index = index;
            vm.editing = true;
        }
        function removeItem(index) {
            vm.model.exerciseArr.splice(index, 1);
        }
    }

})();