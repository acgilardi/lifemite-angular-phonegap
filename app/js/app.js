'use strict';



var app = angular.module('lifemiteAngularPhonegapApp',[])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/main2', {
        templateUrl: 'partials/main2.html',
        controller: "MainCtrl"
       })
      .otherwise({
        redirectTo: '/'
      });
  });
