(function () {

    'use strict';
    angular
        .module('tambola')
        .factory('sharedService', sharedService);

    sharedService.$inject = ['readJsonFileService'];

    function sharedService(readJsonFileService) {

        var service = {
            getResourceProperties: readJsonFileService.getData(CCMS.ENDPOINTS.LOCAL_GET_RESOURCE),
            getResourceTypeProperties: readJsonFileService.getData(CCMS.ENDPOINTS.LOCAL_GET_RESOURCETYPE),
            getServiceTypeProperties: readJsonFileService.getData(CCMS.ENDPOINTS.LOCAL_GET_SERVICETYPE),
        };

        return service;
    };

    /* GENERIC FUNCTION - READ RESOURCE FILE - START */

    angular
        .module('ccms')
        .factory('readJsonFileService', readJsonFileService);

    readJsonFileService.$inject = ['$http', '$log'];

    function readJsonFileService($http, $log) {

        var service = {
            getData: getJsonData
        };

        return service

        function getJsonData(url) {
            return $http
                .get(url)
                .then(getJsonDataResolved)
                .catch(getJsonDataRejected);

            function getJsonDataResolved(jsonResponse) {
                return jsonResponse;
            }

            function getJsonDataRejected(error) {
                $log.error('XHR Failed to read json file: ', error);
            }
        }
    };

    /* GENERIC FUNCTION - READ RESOURCE FILE - END */    

})()