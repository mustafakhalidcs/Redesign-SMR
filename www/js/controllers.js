angular.module('starter.controllers', ['oitozero.ngSweetAlert'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('demoCtrl',['SweetAlert', function(SweetAlert){
    var vm = this;
    vm.alert = function(){
        SweetAlert.swal("I'm a fancy Alert"); //simple alert
    }
    vm.confirm = function(){
        SweetAlert.swal({

             title: "Are you sure?",   text: "You want to cancel the plan?",   type: "warning", showConfirmButton:true,   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes",   cancelButtonText: "No",   closeOnConfirm: false,   closeOnCancel: true }, function(){ swal("Cancel!", "Your Plan has been cancelled.", "success");   
        });
    }
}])

.controller('ProfileCtrl', function($scope) {

  $scope.items = [
  { name:"mustafa khalid", to:"nowshera",from:"lahore",image:"img/76.jpg", date:"23/06/2016"},
     { name:"mustafa khalid", to:"nowshera",from:"lahore",image:"img/76.jpg", date:"23/06/2016"},
       { name:"mustafa khalid", to:"nowshera",from:"lahore",image:"img/76.jpg", date:"23/06/2016"},
       { name:"mustafa khalid", to:"nowshera",from:"lahore",image:"img/76.jpg", date:"23/06/2016"},
       { name:"mustafa khalid", to:"nowshera",from:"lahore",image:"img/76.jpg", date:"23/06/2016"},
       { name:"mustafa khalid", to:"nowshera",from:"lahore",image:"img/76.jpg", date:"23/06/2016"},
       { name:"mustafa khalid", to:"nowshera",from:"lahore",image:"img/76.jpg", date:"23/06/2016"}
  ];
     
})




.controller('ModalCtrl', function($scope, $ionicModal) {
  
   $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
       animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
    $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
    $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  
//  $scope.createContact = function(u) {        
//    $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
//    $scope.modal.hide();
//  };
    $scope.images=[
        {image:"img/a1.png"},
        {image:"img/a2.png"},
        {image:"img/a3.png"},
        {image:"img/a4.png"},
        {image:"img/a5.png"},
        {image:"img/dabba.png"}
    ]
    $scope.current = 'img/ionic.png';
  
})
.controller('RiderModalCtrl', function($scope, $ionicModal) {
  
   $ionicModal.fromTemplateUrl('riderform.html', {
    scope: $scope,
       animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
    $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
    $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  
})


.controller('HomeCtrl', function($scope, $ionicModal) {
  $scope.items = [
  { name:"mustafa khalid", to:"nowshera",from:"lahore",image:"img/76.jpg", date:"23/06/2016", id:1},
     { name:"anmol irfan", to:"peshawar",from:"karachi",image:"img/76.jpg", date:"23/06/2016", id:2},
       { name:"mustafa khalid", to:"nowshera",from:"lahore",image:"img/76.jpg", date:"23/06/2016", id:3},
       { name:"mustafa khalid", to:"nowshera",from:"lahore",image:"img/76.jpg", date:"23/06/2016", id:4},
       { name:"mustafa khalid", to:"nowshera",from:"lahore",image:"img/76.jpg", date:"23/06/2016", id:5},
       { name:"mustafa khalid", to:"nowshera",from:"lahore",image:"img/76.jpg", date:"23/06/2016",id:6},
       { name:"mustafa khalid", to:"nowshera",from:"lahore",image:"img/76.jpg", date:"23/06/2016", id:7}
  ];
   $ionicModal.fromTemplateUrl('login.html', {
    scope: $scope,
       animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
    $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
    $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  
//  $scope.createContact = function(u) {        
//    $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
//    $scope.modal.hide();
//  };
  
  
})


.controller('NotifCtrl', function($scope) {
  $scope.notifs = [
  { name:"mustafa khalid", to:"nowshera",from:"lahore",image:"img/76.jpg", date:"23/06/2016"}
    
  ];
     
})

.controller('UptoursCtrl', function($scope) {
  $scope.notifs = [
  { name:"mustafa khalid", to:"nowshera",from:"lahore",image:"img/76.jpg", date:"23/06/2016"}
    
  ];
     
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
//.controller('BrowCtrl', function($scope) {
//
//  $scope.message="Hello from BrowCtrl";
//  var images=[
//
//        {image:"img/bg.png"},
//        {image:"img/ionic.png"},
//        {image:"img/bg1.png"}
//       
//    ];
//
//    $scope.current = '';
//
//    $scope.url="img/bg.png";
//    $scope.album = images;
//
//     
//})

//.controller('MyCtrl', function($scope) {
//  
//  $scope.data = {
//    showDelete: false
//  };
//  
//  $scope.edit = function(item) {
//    alert('Edit Item: ' + item.id);
//  };
//  $scope.share = function(item) {
//    alert('Share Item: ' + item.id);
//  };
//  
//  $scope.moveItem = function(item, fromIndex, toIndex) {
//    $scope.items.splice(fromIndex, 1);
//    $scope.items.splice(toIndex, 0, item);
//  };
//  
//  $scope.onItemDelete = function(item) {
//    $scope.items.splice($scope.items.indexOf(item), 1);
//  };
//  
//  $scope.items = [
//    { id: 0 },
//    { id: 1 },
//    { id: 2 },
//    { id: 3 },
//    { id: 4 },
//    { id: 5 },
//    { id: 6 },
//    { id: 7 },
//    { id: 8 },
//    { id: 9 },
//    { id: 10 },
//    { id: 11 },
//    { id: 12 },
//    { id: 13 },
//    { id: 14 },
//    { id: 15 },
//    { id: 16 },
//    { id: 17 },
//    { id: 18 },
//    { id: 19 },
//    { id: 20 },
//    { id: 21 },
//    { id: 22 },
//    { id: 23 },
//    { id: 24 },
//    { id: 25 },
//    { id: 26 },
//    { id: 27 },
//    { id: 28 },
//    { id: 29 },
//    { id: 30 },
//    { id: 31 },
//    { id: 32 },
//    { id: 33 },
//    { id: 34 },
//    { id: 35 },
//    { id: 36 },
//    { id: 37 },
//    { id: 38 },
//    { id: 39 },
//    { id: 40 },
//    { id: 41 },
//    { id: 42 },
//    { id: 43 },
//    { id: 44 },
//    { id: 45 },
//    { id: 46 },
//    { id: 47 },
//    { id: 48 },
//    { id: 49 },
//    { id: 50 }
//  ];
//  
//})



 