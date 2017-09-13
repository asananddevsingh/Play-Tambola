(function () {
    'use strict';

    angular
        .module('tambola')
        .controller('HomeController', HomeController);

    HomeController.$inject = [];

    function HomeController() {

        var vm = this;

        /************************* Seting up the initial state - START ************************/

        vm.createTicketModels = {
            row1: {},
            row2: {},
            row3: {}
        }

        vm.rows = [
            {                
                column: {'r1c1':'', 'r1c2':'', 'r1c3':'', 'r1c4':'', 'r1c5':'', 'r1c6':'', 'r1c7':'', 'r1c8':'', 'r1c9':''}
            },
            {
                column: {'r2c1':'', 'r2c2':'', 'r2c3':'', 'r2c4':'', 'r2c5':'', 'r2c6':'', 'r2c7':'', 'r2c8':'', 'r2c9':''}
            },
            {
                column: {'r3c1':'', 'r3c2':'', 'r3c3':'', 'r3c4':'', 'r3c5':'', 'r3c6':'', 'r3c7':'', 'r3c8':'', 'r3c9':''}
            }
      ];

        /*vm.rows = [
            {
                column: ['r1c1', 'r1c2', 'r1c3', 'r1c4', 'r1c5', 'r1c6', 'r1c7', 'r1c8', 'r1c9']
            },
            {
                column: ['r2c1', 'r2c2', 'r2c3', 'r2c4', 'r2c5', 'r2c6', 'r2c7', 'r2c8', 'r2c9']
            },
            {
                column: ['r3c1', 'r3c2', 'r3c3', 'r3c4', 'r3c5', 'r3c6', 'r3c7', 'r3c8', 'r3c9']
            }
      ];*/


        /************************* Seting up the initial state - END ************************/

        /************************* Adding behavior - START ************************************/

        vm.createTicket = createTicket;

        /************************* Adding behavior - END ************************************/

        /************************* Function definations - START ************************************/

        function createTicket(data) {
            console.log(vm.createTicketModels);
        }

        /************************* Function definations - END ************************************/

        vm.getTemplate = function (templateName) {
            return ''.concat('./app/home/templates/', templateName, '.html');
        }
    };

})();
