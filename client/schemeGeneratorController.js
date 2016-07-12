angular.module('colorPsychology', [])


.controller('schemeGeneratorController', function ($scope, $http, $window, ChooseColors){
  console.log("Hello from Controller!");
  $scope.colors = [];
  $scope.color = "";
  $scope.addColor = function(){
    console.log("Pushed color " + $scope.color + " to colors : " + $scope.colors);
  if ($scope.colors.length < 4){
      $scope.colors.push($scope.color);
      console.log($scope.colors);
    }
  if ($scope.colors.length === 4){
      $scope.submitColors();
      $scope.display = "You chose " + $scope.colors.toString();
      $scope.colors = [];
    }
  $scope.submitColors = function(){
      ChooseColors.submit($scope.colors);
    }
  }

})

.factory('ChooseColors', function($http){

  console.log("Choose colors heard the api request!");

  var submit = function(data){
    return $http({
      method: 'POST',
      url: '/',
      data: data
    }).then(function(response){
      console.log(response);
    })
  }

  return {
    submit : submit
  }

})