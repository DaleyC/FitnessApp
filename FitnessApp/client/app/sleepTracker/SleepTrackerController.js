(function () {
    'use strict';

    angular.module('app').controller('SleepTrackerController', SleepTrackerController);

    function SleepTrackerController(sleepTrackerService, $scope, $timeout) {
        var vm = this;

        vm.addSleepDate = addSleepDate;
        vm.checkDateExists = checkDateExists;
        vm.decreasePage = decreasePage;
        vm.deleteDataForDate = deleteDataForDate;
        vm.editItem = editItem;
        vm.increasePage = increasePage;
        vm.numDaysPerPage = 10;
        vm.numFilter = numFilter;
        vm.setDateRange = setDateRange;
        vm.sleepDataObject = {};
        vm.sleepInfoArr = [];
        vm.startDateIndex = 0;

        init();

        function init() {
            $timeout(function () {
                getSleepForDay();
                vm.sleepDataObject.sleepDate = new Date();
            });
        }

        function addSleepDate() {
            if (vm.sleepTrackerForm.$invalid) {
                vm.submitted = true;
                return;
            }
            save();
        }

        function checkDateExists() {
            vm.dateExists = vm.sleepInfoArr.some(function (element) {
                return (vm.sleepDataObject.sleepDate && moment(element.sleepDate).format('MM-DD-YYYY') === moment(vm.sleepDataObject.sleepDate).format('MM-DD-YYYY'));
            });
            return false;
        }

        function decreasePage() {
            vm.startDateIndex -= vm.numDaysPerPage;
            setDatesDisplayed();
        }

        function deleteDataForDate(date) {
            sleepTrackerService.deleteDataForDate(date)
            .then(function () {
                getSleepForDay();
            });
        }

        function disableNextButton() {
            var thisPage = Math.ceil(vm.endDateIndex / vm.numDaysPerPage);
            if (thisPage === vm.numOfPages || vm.datesDisplayed.length === 0) {
                vm.nextButtonDisabled = true;
            }
            else {
                vm.nextButtonDisabled = false;
            }
        }

        function disablePreviousButton() {
            if (vm.startDateIndex === 0 || vm.datesDisplayed.length === 0) {
                vm.prevButtonDisabled = true;
            }
            else {
                vm.prevButtonDisabled = false;
            }
        }

        function editItem(index) {
            vm.sleepDataObject = angular.copy(vm.sleepInfoArr[index]);
            vm.sleepDataObject.sleepDate = moment(vm.sleepDataObject.sleepDate).toDate();
            vm.editing = true;
        }

        function getSleepForDay() {
            vm.getPromise = sleepTrackerService.getSleepForDay()
                .then(function (data) {
                    vm.sleepInfoArr = data.data;
                    vm.sleepInfoArr.reverse();
                    setDateRange();
                    checkDateExists();
                });
            return vm.getPromise;
        }

        function increasePage() {
            vm.startDateIndex += vm.numDaysPerPage;
            setDatesDisplayed();
        }

        function numFilter() {
            if (!vm.numberFilter) {
                vm.numDaysPerPage = 10;
            }
            vm.numDaysPerPage = parseInt(vm.numberFilter);
            vm.startDateIndex = 0;
            setDatesDisplayed();
        }

        function save() {
            var sleepDataObject = angular.copy(vm.sleepDataObject);
            sleepDataObject.IsActive = true;
            sleepTrackerService.save(sleepDataObject)
            .then(function () {
                getSleepForDay();
                vm.submitted = false;
                vm.editing = false;
                vm.sleepDataObject = {};
            });
        }

        function setDateRange() {
            if (vm.dateRangeStart && vm.dateRangeEnd) {
                vm.filteredArray = vm.sleepInfoArr.filter(function (x) {
                    return moment(x.sleepDate).isSameOrAfter(vm.dateRangeStart) && moment(x.sleepDate).isSameOrBefore(vm.dateRangeEnd);
                });
            }
            else if (vm.dateRangeStart && !vm.dateRangeEnd) {
                vm.filteredArray = vm.sleepInfoArr.filter(function (x) {
                    return moment(x.sleepDate).isSameOrAfter(vm.dateRangeStart);
                });
            }
            else if (!vm.dateRangeStart && vm.dateRangeEnd) {
                vm.filteredArray = vm.sleepInfoArr.filter(function (x) {
                    return moment(x.sleepDate).isSameOrBefore(vm.dateRangeEnd);
                });
            }
            else {
                vm.filteredArray = angular.copy(vm.sleepInfoArr);
            }
            setDatesDisplayed();
        }

        function setDatesDisplayed() {
            vm.datesDisplayed = angular.copy(vm.filteredArray);
            vm.numOfPages = Math.ceil(vm.filteredArray.length / vm.numDaysPerPage);
            vm.endDateIndex = vm.startDateIndex + vm.numDaysPerPage;
            vm.datesDisplayed = vm.datesDisplayed.slice(vm.startDateIndex, vm.endDateIndex);
            if (vm.datesDisplayed.length === 0 && vm.startDateIndex !== 0) {
                decreasePage();
            }
            disableNextButton();
            disablePreviousButton();
        }

    }
})();