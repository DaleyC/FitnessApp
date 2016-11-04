(function () {
    'use strict';

    angular.module('app').directive('fixSelect2Validation', fixSelect2Validation);

    function fixSelect2Validation() {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                ngModel: '='
            }
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
            scope.$watch(function () {
                return scope.ngModel;
            },
            function (newValue, oldValue) {
                if (scope.ngModel) {
                    return element.siblings().addClass('removeBorder');
                }
                element.siblings().removeClass('removeBorder');
            });
        }
    }
})();