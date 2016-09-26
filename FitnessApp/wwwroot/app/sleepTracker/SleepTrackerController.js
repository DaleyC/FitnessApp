(function () {
    'use strict';

    angular.module('app').controller('SleepTrackerController', SleepTrackerController);

    function SleepTrackerController(sleepTrackerService, $scope, $timeout) {
        var vm = this;

        vm.addSleepDate = addSleepDate;
        vm.data = [];
        vm.daysPerPage = 10;
        vm.editItem = editItem;
        vm.numFilter = numFilter;
        vm.isSameDate = isSameDate;
        vm.model = {};
        vm.nextPage = nextPage;
        vm.prevPage = prevPage;
        vm.removeDate = removeDate;
        vm.sleepInfoArr = [];
        vm.startDate = 0;

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

        function displayDates() {
            vm.numOfPages = Math.ceil(vm.sleepInfoArr.length / vm.daysPerPage);
            vm.data = angular.copy(vm.sleepInfoArr);
            vm.endDate = vm.startDate + vm.daysPerPage;
            vm.data = vm.data.slice(vm.startDate, vm.endDate);
            if (vm.data.length === 0) {
                prevPage();
            }
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
                    displayDates();
                    isSameDate();
                });
            return vm.getPromise;
        }

        function numFilter() {
            if (!vm.numberFilter) {
                vm.daysPerPage = 10;
            }
            vm.daysPerPage = parseInt(vm.numberFilter);
            vm.startDate = 0;
            displayDates();
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
            if ((Math.ceil(vm.endDate / vm.daysPerPage)) === vm.numOfPages) {
                vm.nextButtonDisabled = true;
            }
            else {
                vm.nextButtonDisabled = false;
            }
        }

        function nextPage() {
            vm.startDate += vm.daysPerPage;
            displayDates();
        }

        function prevDis() {
            if (vm.startDate === 0) {
                vm.prevButtonDisabled = true;
            }
            else {
                vm.prevButtonDisabled = false;
            }
        }

        function prevPage() {
            vm.startDate -= vm.daysPerPage;
            displayDates();
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