angular.module('colorPsych.controllers', [])

.controller('schemeGeneratorController', function ($scope, $compile, $http, $window, ChooseColors){
  $scope.options = ["authoritative", "energetic", "elegant", "expensive", "delicious",
                     "warm", "strong", "powerful", "playful", "vibrant", "festive", "gentle", 
                     "nostalgic", "romatic", "fun", "traditional", "happy", "comfort", "fresh", 
                     "natural", "refreshing"];

  $scope.colors = [];
  $scope.chosen = [];
  $scope.color = "";
  $scope.scheme = false;
  $scope.canvas;
  $scope.addColor = function(color, index){
    if ($scope.chosen.length < 4) {
      $scope.chosen.push(color);
      $scope.options.splice(index, 1);
    }
  }
  $scope.removeColor = function (color, index) {
    console.log("in remove color", color);
    $scope.options.push(color);
    $scope.chosen.splice(index, 1);
  }

 $scope.submitColors = function(){
  $scope.clear();
  console.log($scope.chosen);
    ChooseColors.submit($scope.chosen)
      .then(function(object){
        console.log("submit colors received", object.data);
        $scope.makeColorDiv(object.data.colors);
    });
  }

  $scope.makeColorDiv = function(colorArray){
    $scope.scheme = colorArray;
    var canvas = document.getElementById("colors");
    var ctx = canvas.getContext("2d");
    for (var i = 0; i < colorArray.length; i++){
      console.log('logging color', colorArray[i]);
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = colorArray[i];
                  //x, y, width, height
      ctx.fillRect(i*70,0,50,300);
    }
    $scope.canvas = canvas;
    var newDirective = angular.element('<div class="label" ng-repeat="color in scheme track by $index">{{ color }}</div><button class="submit" ng-click="save()">Save</button>');
    angular.element(document.querySelector('.labels')).append(newDirective);
    $compile(newDirective)($scope);

    // var newDirective = angular.element('<div ng-repeat="color in scheme track by $index" style="background-color: {{ color }}" class="color">{{ color }}</div><button class="submit" ng-click="clear()">Clear</button>');
    // angular.element(document.querySelector('#colors')).append(newDirective);
    // $compile(newDirective)($scope);
  }
  $scope.clear = function(){
    angular.element('.colorContainer').html('<canvas id="colors"></canvas>');
    angular.element('.labels').html('');
  }
  $scope.save = function(){
    console.log('save clicked');
    var imgSrc = $scope.canvas.toDataURL("image/png");
    angular.element(document.querySelector('.colorContainer')).append('<a href="' + imgSrc + '" download=scheme.jpg');
    var url = imgSrc.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    window.open(url)
    console.log("Image saved, ", imgSrc);

  }
  $scope.hello = function (value) {
    console.log(value);
  }

})
