'use strict';

angular.module('<%= appName %>')
  .controller('MainCtrl', function ($scope) {
  	$scope.imagePath = configSettings.staticPath + '/assets/images/';
    $scope.awesomeThings = <%= technologies %>;
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  });
