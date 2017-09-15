(function () {
    'use strict';

    angular
        .module('tambola')
        .controller('HomeController', HomeController);

    HomeController.$inject = [];

    function HomeController() {

        var vm = this;

        /************************* Seting up the initial state - START ************************/
        vm.initTicketModels = {
            ticketNumber: '',
            matrix: {
                rows: [],
                columns: []
            }
        };

        vm.ticketList = [];



        /*Fixed ticket*/
        vm.initTicketModels = {
            row1: {
                'r1c1': '1',
                'r1c2': '',
                'r1c3': '26',
                'r1c4': '',
                'r1c5': '42',
                'r1c6': '51',
                'r1c7': '',
                'r1c8': '72',
                'r1c9': ''
            },
            row2: {
                'r2c1': '',
                'r2c2': '12',
                'r2c3': '',
                'r2c4': '39',
                'r2c5': '',
                'r2c6': '55',
                'r2c7': '',
                'r2c8': '76',
                'r2c9': '82'
            },
            row3: {
                'r3c1': '8',
                'r3c2': '',
                'r3c3': '28',
                'r3c4': '',
                'r3c5': '45',
                'r3c6': '',
                'r3c7': '69',
                'r3c8': '',
                'r3c9': '87'
            }
        };


        vm.ticketListModels = {
            t1: {},
        }

        /************************* Seting up the initial state - END ************************/

        /************************* Adding behavior - START ************************************/

        vm.createTicket = createTicket;
        vm.clearTicket = clearTicket;

        /************************* Adding behavior - END ************************************/


        /************************* Function definations - START ************************************/


        function clearTicket() {
            //vm.ticketModels;
            resetTicketValues();
        }

        function createTicket(data) {

            //angular.element('[data-dismiss="modal"]').trigger('click');
            console.log(vm.initTicketModels);
            vm.ticketList = angular.copy(vm.initTicketModels);
            var newTkt = new CreateTicket(1001, 4, 14);
            newTkt.init();
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
            this.createMatrix = function () {
                var baseModel = {
                    ticketNumber: '',
                    rows: []
                };
                baseModel.ticketNumber = this.ticketNumber;
                for (var i = 1; i <= this.rowsCount; i++) {
                    var row = {}
                    for (var j = 1; j <= this.columnsCount; j++) {
                        row[''.concat('r', i, 'c', j)] = '';
                    }
                    baseModel.rows.push(row);
                };
                return this.models.push(baseModel);
            };
            this.models = [];
            this.init = function () {
                return this.createMatrix();
            }
        }
    };

})();
