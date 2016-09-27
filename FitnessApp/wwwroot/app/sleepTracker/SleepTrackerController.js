(function () {
    'use strict';

    angular.module('app').controller('SleepTrackerController', SleepTrackerController);

    function SleepTrackerController(sleepTrackerService, $scope, $timeout) {
        var vm = this;

        vm.addSleepDate = addSleepDate;
        vm.editItem = editItem;
        vm.isSameDate = isSameDate;
        vm.model = {};
        vm.nextPage = nextPage;
        vm.numDaysPerPage = 10;
        vm.numFilter = numFilter;
        vm.prevPage = prevPage;
        vm.removeDate = removeDate;
        vm.setDateRange = setDateRange;
        vm.sleepInfoArr = [];
        vm.startDateIndex = 0;

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
                    setDateRange();
                    isSameDate();
                });
            return vm.getPromise;
        }

        function numFilter() {
            if (!vm.numberFilter) {
                vm.numDaysPerPage = 10;
            }
            vm.numDaysPerPage = parseInt(vm.numberFilter);
            vm.startDateIndex = 0;
            setDatesDisplayed();
        }

        function isSameDate() {
            vm.sameDate = vm.sleepInfoArr.some(function (element) {
                return moment(element.sleepDate).format("MM-DD-YYYY") === moment(vm.model.sleepDate).format("MM-DD-YYYY");
            });
            if (vm.model.sleepDate === undefined) {
                vm.sameDate = false;
            }
        }

        function nextDisabled() {
            if ((Math.ceil(vm.endDateIndex / vm.numDaysPerPage)) === vm.numOfPages || vm.datesDisplayed.length === 0) {
                vm.nextButtonDisabled = true;
            }
            else {
                vm.nextButtonDisabled = false;
            }
        }

        function nextPage() {
            vm.startDateIndex += vm.numDaysPerPage;
            setDatesDisplayed();
        }

        function prevDisabled() {
            if (vm.startDateIndex === 0 || vm.datesDisplayed.length === 0) {
                vm.prevButtonDisabled = true;
            }
            else {
                vm.prevButtonDisabled = false;
            }
        }

        function prevPage() {
            vm.startDateIndex -= vm.numDaysPerPage;
            setDatesDisplayed();
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

        function setDateRange() {
            if (!vm.dateRangeStart || !vm.dateRangeEnd) {
                vm.filteredArray = angular.copy(vm.sleepInfoArr);
            }
            else if (vm.dateRangeStart && vm.dateRangeEnd) {
                vm.filteredArray = [];
                for (var i = 0; i < vm.sleepInfoArr.length; i++) {
                    if (moment(vm.sleepInfoArr[i].sleepDate).isSameOrAfter(vm.dateRangeStart) && moment(vm.sleepInfoArr[i].sleepDate).isSameOrBefore(vm.dateRangeEnd)) {
                        vm.filteredArray.push(vm.sleepInfoArr[i]);
                    }
                }
            }
            else {
                return;
            }
            setDatesDisplayed();
        }

        function setDatesDisplayed() {
            vm.datesDisplayed = angular.copy(vm.filteredArray);
            vm.numOfPages = Math.ceil(vm.filteredArray.length / vm.numDaysPerPage);
            vm.endDateIndex = vm.startDateIndex + vm.numDaysPerPage;
            vm.datesDisplayed = vm.datesDisplayed.slice(vm.startDateIndex, vm.endDateIndex);
            if (vm.datesDisplayed.length === 0 && vm.startDateIndex != 0) {
                prevPage();
            }
            nextDisabled();
            prevDisabled();
        }

        function today() {
            vm.model.sleepDate = new Date();
        }
    }
})();