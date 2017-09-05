(function () {
    'use strict';
    angular
        .module('ccms')
        .directive('focusMe', function ($timeout) {
            return {
                link: function (scope, element, attrs) {
                    if (element) {
                        $timeout(function () {
                            element[0].focus();
                        });
                    }
                }
            };
        });

})()