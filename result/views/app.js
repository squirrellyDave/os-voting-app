var app = angular.module('catsvsdogs', []);
var socket = io.connect({transports:['polling']});

var bg1 = document.getElementById('background-stats-1');
var bg2 = document.getElementById('background-stats-2');

app.controller('statsCtrl', function($scope){
  console.log('app.controller started...');
  $scope.aPercent = 50;
  $scope.bPercent = 50;

  var updateScores = function(){
    console.log('app.controller.updateScores started...');
    socket.on('scores', function (json) {
      console.log('app.controller.updateScores.socket.on.scores started...');
       data = JSON.parse(json);
       var a = parseInt(data.a || 0);
       var b = parseInt(data.b || 0);

       var percentages = getPercentages(a, b);

       bg1.style.width = percentages.a + "%";
       bg2.style.width = percentages.b + "%";

       $scope.$apply(function () {
         $scope.aPercent = percentages.a;
         $scope.bPercent = percentages.b;
         $scope.total = a + b;
       });
       console.log('app.controller.updateScores.socket.on.scores finished.');
    });
    console.log('app.controller.updateScores finished.');
  };

  var init = function(){
    console.log('app.controller.init started...');
    document.body.style.opacity=1;
    updateScores();
    console.log('app.controller.init finished.');
  };

  socket.on('message',function(data){
    console.log('Received socket message, initialize...');
    init();
    console.log('Initialization finished.');
  });
  console.log('app.controller finished.');
});

function getPercentages(a, b) {
  console.log('Calculating percentages...');
  var result = {};

  if (a + b > 0) {
    result.a = Math.round(a / (a + b) * 100);
    result.b = 100 - result.a;
  } else {
    result.a = result.b = 50;
  }
  console.log('Calculating percentages finished.');
  return result;
}