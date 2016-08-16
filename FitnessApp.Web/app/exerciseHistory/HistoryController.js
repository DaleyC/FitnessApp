(function () {
    'use strict';

    angular.module('app').controller('HistoryController', HistoryController);

    function HistoryController(exerciseTrackerService, $state) {
        var vm = this;

        init();

        function init() {
            exerciseTrackerService.goToState = $state.current.name;
        }
    }

})();