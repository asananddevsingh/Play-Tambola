(function (angular) {
    'use strict';
    angular.module('tambola').controller('HomeController', HomeController);
    HomeController.$inject = ['$scope'];

    function HomeController() {
        var vm = this;
        /************************* Seting up the initial state - START ************************/
        vm.ticketList = [];
        vm.ticketModels = [];
        /*Fixed ticket*/
        var newTicket = new CreateTicket();
        vm.initTicketModels = newTicket.init();
        vm.initTicketModels_test = {
            ticketNumber: 'A1001'
            , results: {
                isFullHouse: false
                , isCorner: false
                , fullRows: []
            }
            , rows: [
                {
                    'r1c1': {
                        'value': '1'
                        , 'isCrossed': true
                    , }
                    , 'r1c2': {
                        'value': ''
                        , 'isCrossed': false
                    , }
                    , 'r1c3': {
                        'value': '26'
                        , 'isCrossed': true
                    , }
                    , 'r1c4': {
                        'value': ''
                        , 'isCrossed': false
                    , }
                    , 'r1c5': {
                        'value': '42'
                        , 'isCrossed': true
                    , }
                    , 'r1c6': {
                        'value': '51'
                        , 'isCrossed': true
                    , }
                    , 'r1c7': {
                        'value': ''
                        , 'isCrossed': false
                    , }
                    , 'r1c8': {
                        'value': '72'
                        , 'isCrossed': true
                    , }
                    , 'r1c9': {
                        'value': ''
                        , 'isCrossed': false
                    }
                , }
                , {
                    'r2c1': {
                        'value': ''
                        , 'isCrossed': false
                    , }
                    , 'r2c2': {
                        'value': '12'
                        , 'isCrossed': true
                    , }
                    , 'r2c3': {
                        'value': ''
                        , 'isCrossed': false
                    , }
                    , 'r2c4': {
                        'value': '39'
                        , 'isCrossed': true
                    , }
                    , 'r2c5': {
                        'value': ''
                        , 'isCrossed': false
                    , }
                    , 'r2c6': {
                        'value': '55'
                        , 'isCrossed': false
                    , }
                    , 'r2c7': {
                        'value': ''
                        , 'isCrossed': false
                    , }
                    , 'r2c8': {
                        'value': '76'
                        , 'isCrossed': true
                    , }
                    , 'r2c9': {
                        'value': '82'
                        , 'isCrossed': false
                    }
                , }
                , {
                    'r3c1': {
                        'value': '8'
                        , 'isCrossed': true
                    , }
                    , 'r3c2': {
                        'value': ''
                        , 'isCrossed': false
                    , }
                    , 'r3c3': {
                        'value': '28'
                        , 'isCrossed': true
                    , }
                    , 'r3c4': {
                        'value': ''
                        , 'isCrossed': false
                    , }
                    , 'r3c5': {
                        'value': '45'
                        , 'isCrossed': true
                    , }
                    , 'r3c6': {
                        'value': ''
                        , 'isCrossed': false
                    , }
                    , 'r3c7': {
                        'value': '69'
                        , 'isCrossed': true
                    , }
                    , 'r3c8': {
                        'value': ''
                        , 'isCrossed': false
                    , }
                    , 'r3c9': {
                        'value': '87'
                        , 'isCrossed': false
                    }
                , }
            ]
        };
        /************************* Seting up the initial state - END ************************/
        /************************* Adding behavior - START ************************************/
        vm.saveTicket = saveTicket;
        vm.clearTicket = clearTicket;
        vm.watchTickets = watchTickets;
        /************************* Adding behavior - END ************************************/
        /************************* Function definations - START ************************************/
        /* $scope.$watch('home.announcedNumber', function (newVal, oldVal) {
             console.log(newVal, '-', oldVal);
         })*/
        function clearTicket() {
            resetTicketValues(vm.initTicketModels);
        }

        function watchTickets(action) {
            switch (action) {
            case 'cross':
                scanTickets(vm.crossNumber, true);
                vm.crossNumber = '';
                break;
            case 'clear':
                scanTickets(vm.clearNumber, false);
                vm.clearNumber = '';
                break;
            }
        }

        function scanTickets(number, isCrossed) {
            if (number) {
                var fullRowsIndex;
                angular.forEach(vm.ticketList, function (listItem, listIndex) {
                    angular.forEach(listItem.rows, function (rowItem, rowIndex) {
                        // Set the announced value.
                        angular.forEach(rowItem, function (item, index) {
                            //1: Cross the selected number.
                            if (item['value'] == number) {
                                item['isCrossed'] = isCrossed;
                            }
                        });
                        // Look for full row.
                        var isOpenValue = false;
                        for (var itemKey in rowItem) {
                            fullRowsIndex = rowIndex;
                            if (rowItem[itemKey]['value'] && !rowItem[itemKey]['isCrossed']) {
                                fullRowsIndex = undefined;
                                break;
                            }
                        };                        
                        if (typeof fullRowsIndex !== 'undefined') {
                            var rowsArray = vm.ticketList[listIndex]['results']['fullRows'];
                            rowsArray.push(fullRowsIndex);
                            var uniqueArray = rowsArray.filter(function (item, pos) {
                                return rowsArray.indexOf(item) == pos;
                            });
                            vm.ticketList[listIndex]['results']['fullRows'] = uniqueArray.sort();
                            //console.log(vm.ticketList[listIndex]['results']);
                        }
                    });
                });
            }
        }

        function saveTicket(data) {
            console.log(data);
            vm.ticketList.push(angular.copy(vm.initTicketModels));
            //angular.element('[data-dismiss="modal"]').trigger('click');                      
        }

        function resetTicketValues(values) {
            values = values || vm.initTicketModels;
            for (var keys in values) {
                var value = values[keys];
                for (var key in value) {
                    value[key] = '';
                }
            }
        }
        /************************* Function definations - END ************************************/
        vm.getTemplate = function (templateName) {
            return ''.concat('./app/home/templates/', templateName, '.html');
        }

        function CreateTicket(ticketNumber, rowsCount, columnsCount) {
            this.ticketNumber = ticketNumber || 'NA';
            this.rowsCount = rowsCount || 3;
            this.columnsCount = columnsCount || 9;
            this.baseModel = {
                ticketNumber: ''
                , results: {
                    isFullHouse: false
                    , isCorner: false
                    , fullRows: []
                }
                , rows: []
            };
            this.createMatrix = function () {
                this.baseModel.ticketNumber = this.ticketNumber;
                for (var i = 1; i <= this.rowsCount; i++) {
                    var row = {}
                    for (var j = 1; j <= this.columnsCount; j++) {
                        row[''.concat('r', i, 'c', j)] = {
                            value: ''
                            , isClosed: false
                        };
                    }
                    this.baseModel.rows.push(row);
                };
                return this.baseModel;
            };
            this.init = function () {
                return this.createMatrix();
            }
        }
    };
})(angular);