(function () {
    'use strict';
    angular
        .module('tambola')
        .factory('authRulesService', authRulesService);

    authRulesService.$inject = ['$http', '$log'];

    function authRulesService($http, $log) {

        var service = {
            getAuthRules: getAuthRules
        };

        return service;
        
        function getAuthRules(url, authorization) {            
            var header = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': authorization
                }
            };

            return $http
                .get(url, header)                
                .then(getAuthRulesComplete)
                .catch(getAuthRulesFailed);

            function getAuthRulesComplete(response) {
                return response;
            };

            function getAuthRulesFailed(error) {
                $log.error('XHR Failed for getAuthRules: ', error);
                return error;
            };
        };
               
    };
})()