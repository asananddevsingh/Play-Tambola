(function () {

    'use strict';

    angular
        .module('ccms')
        .filter('paginationFilter', paginationFilter);

    paginationFilter.$inject = [];

    function paginationFilter() {        
        return function (input, start) {
            if (input) {
                start = +start;
                return input.slice(start);
            }
            return [];
        };
    };

})()