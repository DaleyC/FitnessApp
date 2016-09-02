(function () {
    'use strict';

    angular.module('app').controller('SleepTrackerController', SleepTrackerController);

    function SleepTrackerController() {
        var vm = this;

        vm.addSleepDate = addSleepDate;
        vm.editItem = editItem;
        vm.isSameDate = isSameDate;
        vm.sleepInfoArr = [];
        vm.removeItem = removeItem;
        vm.model = {};

        function addSleepDate() {
            if (vm.sleepTrackerForm.$invalid) {
                vm.submitted = true;
                return;
            }
            else if (vm.editing) {
                vm.sleepInfoArr[vm.index] = angular.copy(vm.model);
            }
            else {
                vm.sleepInfoArr.push(angular.copy(vm.model));
            }
            vm.model = {};
            vm.submitted = false;
            vm.editing = false;
        }
        function editItem(index) {
            vm.model = angular.copy(vm.sleepInfoArr[index]);
            vm.index = index;
            vm.editing = true;
        }
        function isSameDate() {
            var sameDate = vm.sleepInfoArr.some(function (element) {
                return moment(element.selectedDate).format("MM-DD-YYYY") === moment(vm.model.selectedDate).format("MM-DD-YYYY");
            })
            if (vm.model.selectedDate === undefined) {
                sameDate = false;
            }
            return sameDate;
        }
        function removeItem(index) {
            vm.sleepInfoArr.splice(index, 1);
        }
    }
})();