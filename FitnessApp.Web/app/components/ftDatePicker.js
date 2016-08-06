(function () {
    'use strict';

    angular.module('app').component('ftDatePicker', {
        templateUrl: 'app/components/ftDatePicker.html',
        controller: ftDatePickerController,
        bindings: {
            selectedDate: '='
        }
    })

    function ftDatePickerController() {
        var vm = this;

        vm.datePickerPopup = {
            opened: false
        }
        vm.format = 'shortDate';
        vm.open = open;
        vm.today = today;

        init();

        function init() {
            today();
        }

        function today() {
            vm.selectedDate = new Date();
        }
        function open() {
            vm.datePickerPopup.opened = true;
        }
    }

})();