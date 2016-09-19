angular.module('colorPsych.controllers', [])

.controller('schemeGeneratorController', function (
  $scope, $route, $location, 
  $routeParams, $compile, $http, 
  $window, ChooseColors){
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  $scope.showSave = false;
  console.log('SHOWSAVE', $scope.showSave);

  $scope.options = ChooseColors.getColors()
    .then(function(request){
      $scope.options = request;
    });
  $scope.colors = [];
  $scope.chosen = [];
  $scope.color = "";
  $scope.scheme = false;

  $scope.addColor = function(color, index){
    if ($scope.chosen.length < 4) {
      $scope.chosen.push(color);
      $scope.options.splice(index, 1);
    }
  }
  $scope.removeColor = function (color, index) {
    $scope.options.push(color);
    $scope.chosen.splice(index, 1);
  }

 $scope.submitColors = function(){
  $scope.clear();
    ChooseColors.submit($scope.chosen)
      .then(function(object){
        $scope.makeColorDiv(object.data.colors);
    });
    $scope.showSave = true;
    console.log('SHOWSAVE', $scope.showSave);
  }

  $scope.makeColorDiv = function(colorArray){
    $scope.scheme = colorArray;
    var canvas = document.getElementById("colors");
    for (var i = 0; i < colorArray.length; i++){
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = colorArray[i];
                  //  x,  y, width, height
      ctx.fillRect(i*71, 0, 50, 300);
    }
    $scope.canvas = canvas;
    var colorCodes = angular.element('<div class="label" ng-repeat="color in scheme track by $index">{{ color }}</div>');
    angular.element(document.querySelector('.labels')).append(colorCodes);
    $compile(colorCodes)($scope);

    // var newDirective = angular.element('<div ng-repeat="color in scheme track by $index" style="background-color: {{ color }}" class="color">{{ color }}</div><button class="submit" ng-click="clear()">Clear</button>');
    // angular.element(document.querySelector('#colors')).append(newDirective);
    // $compile(newDirective)($scope);
  }
  $scope.clear = function(){
    angular.element('.colorContainer').html('<canvas id="colors"></canvas>');
    angular.element('.labels').html('');
  }
  $scope.clearColors = function() {
    $scope.showSave = false;
    console.log('SHOWSAVE', $scope.showSave);
    $scope.chosen.forEach(function(color){
      $scope.options.push(color);
    });
    $scope.chosen = [];
  }
  window.aids = function(){$scope.showSave = !$scope.showSave; console.log($scope.showSave)};
  $scope.save = function(){
    var imgSrc = $scope.canvas.toDataURL("image/png");
    angular.element(document.querySelector('.colorContainer')).append('<a href="' + imgSrc + '" download=scheme.jpg');
    var url = imgSrc.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    window.open(url)
    console.log("Image saved, ", imgSrc);

  } 
})


//WHY THE FUCK?!?!?!?!? NG IF!??!!? WHAT THE FUCK!!!!! hi emily :)