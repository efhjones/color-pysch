angular.module('colorPsych', [
  'colorPsych.services',
  'colorPsych.controllers',
  'ngRoute'
])


.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'index.html',
    controller: 'schemeGeneratorController',
  })
});