(function () {
    'use strict';

    angular.module('app').controller('BaseController', BaseController);

    function BaseController() {
        var vm = this;
        vm.isCollapsedHorizontal = true;
    }
})();