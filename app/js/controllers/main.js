'use strict';

//angular.module('lifemiteAngularPhonegapApp')
app.controller('MainCtrl', function ($scope, dataFactory, $location) {


    $scope.customers = dataFactory.getCustomers();


    $scope.$on('$viewContentLoaded', function(){
        general();
    });

    $scope.go1 = function() {
        $location.path('/main')
    };

    $scope.go2 = function() {
        $location.path('/main2')
    };
  });
