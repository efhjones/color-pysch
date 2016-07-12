angular.module('colorPsychology', [])


.controller('schemeGeneratorController', function ($scope, $compile, $http, $window, ChooseColors){
  $scope.colors = [];
  $scope.color = "";
  $scope.scheme = false;
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
      ChooseColors.submit($scope.colors)
        .then(function(object){
          $scope.makeColorDiv(object.data.colors);
      });
    }

  }
  $scope.makeColorDiv = function(colorArray){
    $scope.scheme = colorArray;
    var newDirective = angular.element('<div ng-repeat="color in scheme track by $index" style="background-color: {{ color }}" class="color">{{ color }}</div><button class="submit" ng-click="clear()">Clear</button>');
    angular.element(document.querySelector('#colors')).append(newDirective);
    $compile(newDirective)($scope);
  }

  $scope.clear = function(){
    angular.element('#colors').html('');
  }
})

.factory('ChooseColors', function($http){

  var submit = function(data){
    return $http({
      method: 'POST',
      url: '/',
      data: data
    })
    .then(function(){
      var request = $http({
        method: 'GET',
        url: '/scheme'
      });
      return request;
    });
  }

  return {
    submit: submit
  }

});