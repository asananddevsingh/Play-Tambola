(function () {
    'use strict';
    angular
        .module('ccms')
        .directive('validNumber', function () {
            return {
                require: '?ngModel',
                link: function (scope, element, attrs, ngModelCtrl) {
                    if (!ngModelCtrl) {
                        return;
                    };
                    ngModelCtrl.$parsers.push(function (val) {
                        var clean = val.replace(/[^0-9]+/g, '');
                        if (val !== clean) {
                            ngModelCtrl.$setViewValue(clean);
                            ngModelCtrl.$render();
                            /*To alert the message popup*/
                            showAlert('.fn_alert_number');
                            /*To alert the message popup*/
                        }
                        return clean;
                    });

                    element.bind('keypress', function (event) {
                        if (event.keyCode === 32) {
                            event.preventDefault();
                        }
                    });
                }
            };
        });

    angular
        .module('ccms')
        .directive('validString', function () {
            return {
                require: '?ngModel',
                link: function (scope, element, attrs, ngModelCtrl) {
                    if (!ngModelCtrl) {
                        return;
                    };
                    ngModelCtrl.$parsers.push(function (val) {
                        var clean = val.replace(/[^A-Za-z]+/g, '');
                        if (val !== clean) {
                            ngModelCtrl.$setViewValue(clean);
                            ngModelCtrl.$render();
                            /*To alert the message popup*/
                            showAlert('.fn_alert_string');
                            /*To alert the message popup*/
                        }
                        return clean;
                    });

                    element.bind('keypress', function (event) {
                        if (event.keyCode === 32) {
                            event.preventDefault();
                        }
                    });
                }
            };
        });

    angular
        .module('ccms')
        .directive('validateBootstrap', function () {            
            return {
                require: 'ngModel',
                link: function (scope, ele, attr) {
                    var directParent = ele.parent()[0];
                    if (directParent) {
                        scope.$watch(attr.ngModel, function (newVal, oldVal) {
                            if (!newVal && oldVal) {
                                directParent.classList.add('has-error');
                                directParent.classList.add('has-danger');
                            } else {
                                directParent.classList.remove('has-error');
                                directParent.classList.remove('has-danger');
                            }
                        });

                        ele.on('blur', function (e) {
                            if (e.target.hasAttribute('required') && e.target.classList.contains('ng-invalid-required')) {
                                ele.parent()[0].classList.add('has-error');
                                ele.parent()[0].classList.add('has-danger');
                            } else {
                                ele.parent()[0].classList.remove('has-error');
                                ele.parent()[0].classList.remove('has-danger');
                            }
                        });
                    }
                }
            }
        });

    function showAlert(selecter) {
        angular.element(selecter).alert();
        angular.element(selecter).fadeTo(2000, 500).slideUp(500);
    };

})()