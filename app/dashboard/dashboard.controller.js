(function () {
    'use strict';

    angular
        .module('ccms')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$state', '$stateParams', '$log', '$http', '$rootScope', 'authRulesService', 'filterFilter', 'sharedService', 'oauthTokenService', 'sessionService'];

    function DashboardController($scope, $state, $stateParams, $log, $http, $rootScope, authRulesService, filterFilter, sharedService, oauthTokenService, sessionService) {

        var vm = this;

        /************************* Seting up the initial state - START ************************/

        /* Pagination properties */
        vm.currentPage = 1;
        vm.entryLimit = 10;

        /* Array, which will hold the data recieved from services */
        vm.authRuleList = [];
        vm.resources = [];
        vm.resourcesType = [];
        vm.servicesType = [];

        /************************* Adding behavior - START ************************************/
        sessionStorage.setItem('editRule', '{}');

        vm.addNewRule = gotoCreateRulePage;        
        vm.deleteRule = deleteRuleHandelr;
        vm.editRule = editRuleHandler;
        vm.hideAlertNumber = hideAlertNumber;
        vm.hideAlertString = hideAlertString;
        vm.openDeleteModal = deleteRuleModalHandler;
        vm.parseLinkedAccount = parseLinkedAccount
        vm.refreshResults = refreshResultsHandler;
        vm.resetFilters = resetRuleListFilters;
        

        $rootScope.selectedMenu = $rootScope.mainMenuList.home;

        /****************************** Function Invocation ***********************************/
        /*
        $rootScope.$on('oauth', function (event, data) {
            if (data && data.isOauth) {

            } else {
                alert('Not authorized.');
            }
        })*/

        //getOAuthorizationToken();        
        bindAuthRules();
        bindResourceDropdown();
        bindResourceTypeDropdown();
        bindServiceTypeDropdown();


        /****************************** Service Function Definations ***********************************/

        $scope.$watch('search', searchRuleList, true);

        function bindAuthRules() {
            return authRulesService
                .getAuthRules(CCMS.ENDPOINTS.GET_AUTHORIZATION_RULES, sessionStorage.getItem('authorization'))
                .then(getAuthRulesResolve)
                .catch(promiseRejected);
        };

        function getAuthRulesResolve(response) {
            vm.isDashboardDataAvailable = true;
            if (response && response.status === 200) {
                vm.authRuleList = response.data;
                renderPagination(vm.authRuleList);
                return vm.authRuleList;
            } else if (response && response.status === 500) {
                $rootScope.intservererror = true;
                sessionService.errorPopup();
            } else {
                $rootScope.sessionout = true;
                sessionService.errorPopup();
            }
        };

        /****************************** Dropdown Function Definations ***********************************/

        function bindResourceDropdown() {
            return sharedService
                .getResourceProperties
                .then(resourcePropertiesResolve)
                .catch(promiseRejected);
        };

        function resourcePropertiesResolve(response) {
            if (response && response.data.resources.length) {
                vm.resources = response.data.resources;
                return vm.resources;
            }
            return [];
        };

        function bindResourceTypeDropdown() {
            return sharedService
                .getResourceTypeProperties
                .then(resourceTypePropertiesResolve)
                .catch(promiseRejected);
        };

        function resourceTypePropertiesResolve(response) {
            if (response && response.data.resourcesType.length) {
                vm.resourcesType = response.data.resourcesType;
                return vm.resourcesType;
            }
            return [];
        };

        function bindServiceTypeDropdown() {
            return sharedService
                .getServiceTypeProperties
                .then(serviceTypePropertiesResolve)
                .catch(promiseRejected);
        };

        function serviceTypePropertiesResolve(response) {
            if (response && response.data.servicesType.length) {
                vm.servicesType = response.data.servicesType;
                return vm.servicesType;
            }
            return [];
        };

        /****************************** Event Function Definations ***********************************/
        function editRuleHandler(rule) {
            sessionStorage.setItem('editRule', JSON.stringify({
                isEditing: true,
                rule: rule
            }));
            $state.go('create');
        };

        function deleteRuleModalHandler(rule) {
            vm.deleteableRule = rule;
            angular.element('#modalDelete').modal('show');
        };

        function deleteRuleHandelr() {
            return authRulesService
                .deleteAuthRules(CCMS.ENDPOINTS.PUT_AUTHORIZATION_RULES.concat("/").concat(vm.deleteableRule.authConfigId), sessionStorage.getItem('authorization'))
                .then(deleteAuthRulesResolve)
                .catch(promiseRejected);
        };

        function deleteAuthRulesResolve(response) {
            bindAuthRules();
            resetRuleListFilters();
            angular.element('#modalDelete').modal('hide');
        };

        function gotoCreateRulePage() {
            sessionStorage.setItem('editRule', '{}');
            $state.go("create");
        };

        function parseLinkedAccount(group) {            
            let linkedGroup = '';
            if (group && group.length) {
                group.forEach(function (item, index) {
                    linkedGroup = linkedGroup.concat(item.accountGroup).concat(',');
                })
                linkedGroup = linkedGroup.substr(0, linkedGroup.length - 1);
            }
            return linkedGroup;
        };

        function resetRuleListFilters() {
            $scope.search = {};            
            angular.element('#application').focus();
        };

        function refreshResultsHandler (){
            $state.reload();
        }
        
        function searchRuleList(newVal, oldVal) {
            /* If the search parameter is blank, then it will delete that property from the search object so that it can filter the blank values of the datalist */
            if (newVal) {
                for (let prop in newVal) {
                    if (newVal.hasOwnProperty(prop) && !newVal[prop]) {
                        delete newVal[prop];
                    };
                };
                vm.filteredRules = filterFilter(vm.authRuleList, newVal);
                renderPagination(vm.filteredRules);
                vm.currentPage = 1;
            };
        };

        function renderPagination(result) {
            vm.totalItems = result.length;
            vm.noOfPages = Math.ceil(vm.totalItems / vm.entryLimit);
        }

        function hideAlertNumber() {
            $(".fn_alert_number").hide();
        };

        function hideAlertString() {
            $(".fn_alert_string").hide();
        };

        function promiseRejected(error) {
            $log.error('Promise got rejected: ', error);
            $state.go('login');
        };
    };

})();