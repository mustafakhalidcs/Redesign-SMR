angular.module('starter.controllers')
.controller('SignupCtrl', function($scope,$http) {
  $scope.fname = "test";
  $scope.createUser=function(){
    console.log("Hello from create user");
    console.log($scope.fname);
    $http({
          method: 'POST',
          data: $.param(
          {
           'first_name': $scope.fname, 
           'last_name': $scope.lname, 
           'mobile': $scope.mobileno ,
           'resident_of': $scope.resident_of ,
           'email': $scope.email , 
           'password': $scope.password ,
           'nic': $scope.nic ,
           "command":"createUser"
         }
         ),
          headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
          url: "http://localhost:8080/ShareMyRide/signup.php"
          }).success(function(data,status,headers,config){
            console.log(console.log($scope.fname));
          });
  	}
  
})