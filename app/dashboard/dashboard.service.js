(function () {
    'use strict';
    angular
        .module('ccms')
        .factory('authRulesService', authRulesService);

    authRulesService.$inject = ['$http', '$log'];

    function authRulesService($http, $log) {

        var service = {
            getAuthRules: getAuthRules,
            deleteAuthRules: deleteAuthRules
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
        
        function deleteAuthRules(url, authorization) {            
            var header = {
                headers: {                    
                    'Authorization': authorization
                }
            };

            return $http
                .delete(url, header)
                .then(deleteAuthRulesComplete)
                .catch(deleteAuthRulesFailed);

            function deleteAuthRulesComplete(response) {
                return response;
            };

            function deleteAuthRulesFailed(error) {
                $log.error('XHR Failed for delete AuthRules: ', error);
                return error;
            };
        };
    };
})()