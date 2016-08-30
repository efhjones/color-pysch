angular.module('colorPsych.services', [])

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

  // var hipster = function () {
  //   return $http({
  //     method: 'GET',
  //     url: 'http://hipsterjesus.com/api/'
  //   })
  //   .then(function(response){
  //     return response;

  //   })
  // }

  return {
    submit: submit
    //hipster: hipster
  }

});