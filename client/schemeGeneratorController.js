angular.module('colorPsychology', [])


.controller('schemeGeneratorController', function ($scope, $window, ChooseColors){
  console.log("Hello from Controller!");
  $scope.colors = [];
  $scope.addColor = function(item){
    $scope.colors.push(item);
  }

})

.factory('ChooseColors', function(){

  console.log("Choose colors heard the api request!");

  var submit = function(data){
    return $.http({
      method: 'POST',
      url: '/api/generate',
      data: data
    }).then(function (resp){
      resp.send('Thanks!');
    })
  }

  return {
    submit : submit
  }

})