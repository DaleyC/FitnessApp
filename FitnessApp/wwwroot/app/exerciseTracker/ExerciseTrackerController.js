(function () {
    'use strict';

    angular.module('app').controller('ExerciseTrackerController', ExerciseTrackerController);

    function ExerciseTrackerController(exerciseTrackerService, $state) {
        var vm = this;

        init();

        function init() {
            $state.go(exerciseTrackerService.goToState);
            if (exerciseTrackerService.goToState === 'base.exerciseTracker.dailyTracker') {
                vm.tabIndex = 0;
            }
            else {
                vm.tabIndex = 1;
            }
        }
    }

})();