(function () {
    'use strict';

    angular.module('app').component('daDatePicker', {
        templateUrl: 'daDatePicker.html',
        controller: daDatePickerController,
        bindings: {
            selectedDate: '='
        }
    })
    function daDatePickerController() {

    }

})();