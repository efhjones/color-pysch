angular.module('colorPsychology', [])


.controller('schemeGeneratorController', function ($scope, $compile, $http, $window, ChooseColors){
  $scope.colors = [];
  $scope.color = "";
  $scope.scheme = false;
  $scope.display = "color"
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
    var canvas = document.getElementById("colors");
    var ctx = canvas.getContext("2d");
    for (var i = 0; i < colorArray.length; i++){
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = colorArray[i];
                  //x, y, width, height
      ctx.fillRect(i*110,20,90,330);
    }
    var newDirective = angular.element('<div ng-repeat="color in scheme track by $index" class="label">{{color}}</div>');


    angular.element(document.querySelector('#labels')).append(newDirective);
    $compile(newDirective)($scope);
  }

  $scope.clear = function(){
    angular.element('#colors').html('');
  }
  $scope.saveScheme = function(){
    html2canvas(element, {
      onrendered: function(canvas){
        console.log(canvas);
      }
    });
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