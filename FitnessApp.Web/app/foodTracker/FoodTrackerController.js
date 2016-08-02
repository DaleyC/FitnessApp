﻿(function () {
    'use strict';

    angular.module('app').controller('FoodTrackerController', FoodTrackerController);

    function FoodTrackerController() {
        var vm = this;
        vm.calories = 0;
        vm.remainingCalories = 2000;

    }
})();