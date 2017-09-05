(function () {
    'use strict';

    angular.module('ccms')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$rootScope', 'sessionService'];

    function LogoutController($rootScope, sessionService) {
        var vm = this;

        vm.getUserLogonid = getUserLogonId;
        vm.logout = logout;

        function getUserLogonId() {
            return $rootScope.logonid || sessionStorage.getItem('logonid');
        };

        function logout(){
            sessionService.signOff();
        }
        
        /*function logout() {
            var queryString = '';
            queryString = queryString.concat('?ssotoken=invalidate&client_id=', CCMS.OAUTHPARAM.CLIENT_ID, '&lang=en_US&access_token=', sessionStorage.getItem('accesstoken'));
            location.href = CCMS.ENDPOINTS.POST_LOGOUT_SESSION.concat(queryString);
            sessionStorage.clear();
            localStorage.clear();
        };*/
    };
}())