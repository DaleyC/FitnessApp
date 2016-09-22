(function () {
    'use strict';

    angular.module('app').controller('SleepTrackerController', SleepTrackerController);

    function SleepTrackerController(sleepTrackerService, $scope, $timeout) {
        var vm = this;

        vm.addSleepDate = addSleepDate;
        vm.data = [];
        vm.start = 0;
        vm.editItem = editItem;
        vm.isSameDate = isSameDate;
        vm.model = {};
        vm.nextPage = nextPage;
        vm.prevPage = prevPage;
        vm.removeDate = removeDate;
        vm.sleepInfoArr = [];

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
            save();
            vm.model = {};
            vm.submitted = false;
            vm.editing = false;
        }

        function dispDates() {
            vm.data = angular.copy(vm.sleepInfoArr);
            var end = vm.start + 7;
            vm.data = vm.data.slice(vm.start, end);
            nextDis();
            prevDis();
        }

        function editItem(index) {
            vm.model = angular.copy(vm.sleepInfoArr[index]);
            vm.model.sleepDate = new Date(vm.model.sleepDate);
            vm.editing = true;
        }

        function getSleepForDay() {
            vm.getPromise = sleepTrackerService.getSleepForDay()
                .then(function (data) {
                    vm.sleepInfoArr = data.data;
                    vm.sleepInfoArr.reverse();
                    dispDates();
                    isSameDate();
                });
            return vm.getPromise;
        }

        function isSameDate() {
            vm.sameDate = vm.sleepInfoArr.some(function (element) {
                return moment(element.sleepDate).format("MM-DD-YYYY") === moment(vm.model.sleepDate).format("MM-DD-YYYY");
            });
            if (vm.model.sleepDate === undefined) {
                vm.sameDate = false;
            }
        }

        function nextDis() {
            var numOfPages = Math.ceil(vm.sleepInfoArr.length / 7);
            if ((Math.ceil(vm.start / 7) + 1) === numOfPages) {
                vm.nextDisabled = true;
            }
            else { vm.nextDisabled = false; }
        }

        function nextPage() {
            vm.start += 7;
            dispDates();
        }

        function prevDis() {
            if (vm.start === 0) {
                vm.prevDisabled = true;
            }
            else {
                vm.prevDisabled = false;
            }
        }

        function prevPage() {
            vm.start -= 7;
            dispDates();
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