(function () {
    'use strict';

    angular.module('app').controller('SleepTrackerController', SleepTrackerController);

    function SleepTrackerController(sleepTrackerService, $scope, $timeout) {
        var vm = this;

        vm.addSleepDate = addSleepDate;
        vm.editItem = editItem;
        vm.isSameDate = isSameDate;
        vm.model = {};
        vm.removeItem = removeItem;
        vm.save = save;
        vm.sleepInfoArr = [];

        init();

        function init() {
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
            $timeout(function () {
                getSleepForDay();
            });
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
                });
            return vm.getPromise;
        }

        function isSameDate() {
            var sameDate = vm.sleepInfoArr.some(function (element) {
                return moment(element.sleepDate).format("MM-DD-YYYY") === moment(vm.model.sleepDate).format("MM-DD-YYYY");
            });
            if (vm.model.sleepDate === undefined) {
                sameDate = false;
            }
            return sameDate;
        }

        function removeItem(index) {
            vm.sleepInfoArr.splice(index, 1);
        }

        function save() {
            vm.model.sleepDate = moment(vm.model.sleepDate).format('MM/DD/YYYY');
            sleepTrackerService.save(vm.model)
            .then(function () {
            });
        }
    }
})();