'use strict';

//angular.module('lifemiteAngularPhonegapApp')
app.controller('MainCtrl', function ($scope,dataFactory) {
    $scope.customers = dataFactory.getCustomers();
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.$on('$viewContentLoaded', function(){
        general();
    });

  });
