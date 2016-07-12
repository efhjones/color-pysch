angular.module('colorPsychology', [])


.controller('schemeGeneratorController', function ($scope, $http, $window, ChooseColors){
  $scope.colors = [];
  $scope.color = "";
  $scope.addColor = function(){
  if ($scope.colors.length < 4){
    if($scope.color.length > 1){
      $scope.colors.push($scope.color);
      console.log($scope.colors);
    }
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
  var submit = function(data){
    return $http({
      method: 'POST',
      url: '/',
      data: data
    }).then(function(){
      return $http({
        method: 'GET',
        url: '/scheme'
      }).then(function(data){
        console.log("controller received data, ", data);
      })
    })
  }

  return {
    submit : submit
  }

})