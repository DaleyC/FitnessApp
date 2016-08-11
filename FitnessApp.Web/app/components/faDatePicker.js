(function () {
    'use strict';

    angular.module('app').component('faDatePicker', {
        templateUrl: 'app/components/faDatePicker.html',
        controller: faDatePickerController,
        bindings: {
            selectedDate: '=',
            editing: '='
        }
    })

    function faDatePickerController() {
        var vm = this;
        vm.editing = false;

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