(function () {
    'use strict';

    angular.module('app').controller('ExerciseTrackerController', ExerciseTrackerController);

    function ExerciseTrackerController() {
        var vm = this;

        vm.exercise = {};
        vm.model = {};
        vm.model.exerciseArr = [];

    }
})();