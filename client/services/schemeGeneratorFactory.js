angular.module('colorPsych.services', [])

.factory('ChooseColors', function($http){

  var submit = function(data) {
    return $http({
      method: 'POST',
      url: '/',
      data: data
    })
    .then(function() {
      var request = $http({
        method: 'GET',
        url: '/scheme'
      });
      return request;
    });
  }

  var getColors = function() {
    var request= $http({
      method: 'GET',
      url: '/colors'
    })
    .then(function(response) {
      console.log('data', response);
      return response.data;
    })
    return request;
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
    submit: submit,
    getColors: getColors
    //hipster: hipster
  }

});