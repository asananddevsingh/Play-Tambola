(function () {
    'use strict';
    angular
        .module('ccms')
        .factory('sessionService', sessionService);

    sessionService.$inject = ['$http', '$state', '$timeout', '$rootScope'];

    function sessionService($http, $state, $timeout, $rootScope) {
        
        var service = {
            errorPopup: errorPopup,
            signOff: signOff
        };

        return service;

        function errorPopup() {

            angular.element('#modalSession').modal('show');
            var timer = $timeout(onTimeout, 1000);

            function onTimeout() {
                $rootScope.sessionCountDown = $rootScope.sessionCountDown > 0 ? $rootScope.sessionCountDown - 1 : 0;
                timer = $timeout(onTimeout, 1000);
            };

            function cancelTimeer() {
                $timeout.cancel(timer);
            };

            setTimeout(function () {
                cancelTimeer();
                signOff();
            }, 5000);
        };
        
        function signOff() {            
            var queryString = '';
            queryString = queryString.concat('?ssotoken=invalidate&client_id=', CCMS.OAUTHPARAM.CLIENT_ID, '&lang=en_US&access_token=', sessionStorage.getItem('accesstoken'));
            location.href = CCMS.ENDPOINTS.POST_LOGOUT_SESSION.concat(queryString);
            sessionStorage.clear();
            localStorage.clear();
        };

    };
}())