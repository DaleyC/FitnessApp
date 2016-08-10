(function () {
    'use strict';

    angular.module('app').controller('SleepTrackerController', SleepTrackerController);

    function SleepTrackerController() {
        var vm = this;

        vm.addSleepDate = addSleepDate;
        vm.isSameDate = isSameDate;
        vm.sleepInfoArr = [];

        vm.model = {};

        function addSleepDate() {
            var sameDate = vm.sleepInfoArr.some(function (element) {
                return moment(element.selectedDate).format("MM-DD-YYYY") === moment(vm.model.selectedDate).format("MM-DD-YYYY");
            })
            if (sameDate) {
                vm.repeatDate = true;
            }
            if (vm.sleepTrackerForm.$invalid || sameDate) {
                vm.submitted = true;
                return;
            }
            var savedSleep = angular.copy(vm.model);
            vm.sleepInfoArr.push(savedSleep);
            vm.model = {};
            vm.submitted = false;
            vm.repeatDate = false;
        }
        function isSameDate() {
            var sameDate = vm.sleepInfoArr.some(function (element) {
                return moment(element.selectedDate).format("MM-DD-YYYY") === moment(vm.model.selectedDate).format("MM-DD-YYYY");
            })
            return sameDate;
        }
    }
})();