angular.module('colorPsychology', [])


.controller('schemeGeneratorController', function ($scope, $http, $window, ChooseColors){
  console.log("Hello from Controller!");
  $scope.colors = [];
  $scope.color = "";
  $scope.addColor = function(){
    $scope.colors.push($scope.color);
    console.log("Pushed color " + $scope.color + " to colors : " + $scope.colors);
    if ($scope.colors.length === 4){
      $scope.submitColors();
    }
  }
  $scope.submitColors = function(){
    if ($scope.colors.length === 4){
      ChooseColors.submit($scope.colors);
    }
  }

})

.factory('ChooseColors', function($http){

  console.log("Choose colors heard the api request!");

  var submit = function(data){
    return $http({
      method: 'POST',
      url: '/traits',
      data: data
    }).then(function (resp){
      resp.send('Thanks!');
    })
  }

  return {
    submit : submit
  }

})