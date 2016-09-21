(function () {
    'use strict';

    angular.module('app').controller('SleepTrackerController', SleepTrackerController);

    function SleepTrackerController(sleepTrackerService, $scope, $timeout) {
        var vm = this;

        vm.addSleepDate = addSleepDate;
        vm.editItem = editItem;
        vm.isSameDate = isSameDate;
        vm.model = {};
        vm.removeDate = removeDate;
        vm.save = save;
        vm.sleepInfoArr = [];
        vm.sameDate;

        init();

        function init() {
            today();
            $timeout(function () {
                getSleepForDay();
            });
        }

        function addSleepDate() {
            if (vm.sleepTrackerForm.$invalid) {
                vm.submitted = true;
                return;
            }
            else if (vm.editing) {
                vm.sleepInfoArr[vm.index] = angular.copy(vm.model);
            }
            save();
            vm.model = {};
            vm.submitted = false;
            vm.editing = false;
        }

        function editItem(index) {
            vm.model = angular.copy(vm.sleepInfoArr[index]);
            vm.index = index;
            vm.editing = true;
        }

        function getSleepForDay() {
            vm.getPromise = sleepTrackerService.getSleepForDay()
                .then(function (data) {
                    vm.sleepInfoArr = data.data;
                    isSameDate();
                });
            return vm.getPromise;
        }

        function isSameDate() {
            vm.sameDate = vm.sleepInfoArr.some(function (element) {
                return moment(element.sleepDate).format("MM-DD-YYYY") === moment(vm.model.sleepDate).format("MM-DD-YYYY");
            });
            if (vm.model.sleepDate === undefined) {
                sameDate = false;
            }
        }

        function removeDate(date) {
            sleepTrackerService.removeDate(date)
            .then(function () {
                getSleepForDay();
            });
        }

        function save() {
            var model = angular.copy(vm.model);
            sleepTrackerService.save(model)
            .then(function () {
                getSleepForDay();
            });
        }
        function today() {
            vm.model.sleepDate = new Date();
        }
    }
})();