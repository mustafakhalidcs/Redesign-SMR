// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
    angular.module('starter', ['ionic', 'starter.controllers','ngMessages'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})




.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
.state('tour',{
            url: '/',
            templateUrl: 'tour.html',
            controller: 'TourCtrl'
        })
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'search.html',
         
      }
    }
  })
   
  .state('app.notif', {
      url: '/notif',
      views: {
        'menuContent': {
          templateUrl: 'notif.html',
            controller: 'NotifCtrl'

        }
      }
    })
   .state('app.uptours', {
      url: '/uptours',
      views: {
        'menuContent': {
          templateUrl: 'uptours.html',
            controller: 'UptoursCtrl'

        }
      }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    
    .state('app.tours-list', {
      url: '/tours-list',
      views: {
        'menuContent': {
          templateUrl: 'tours-list.html',
          controller: 'tourCtrl'
        }
      },
      params: {'destination': ':destination' , 'departure_date' : ':departure_date' , 'command' : ':command'}
    })
//    .state('app.signin', {
//      url: '/signin',
//      views: {
//        'menuContent': {
//          templateUrl: 'signin.html',
//          controller: 'signin'
//        }
//      }
//    })
//    .state('app.login', {
//      url: '/',
//      views: {
//        'menuContent': {
//          templateUrl: 'signin.html',
//          controller: 'signin'
//        }
//      }
//    })

//  .state('app.signup', {
//    url: '/signup',
//    views: {
//      'menuContent': {
//        templateUrl: 'signup.html',
//        controller: 'SignupCtrl' 
//      }
//    }
//  })
   .state('signin', {
      url: '/signin',
      
          templateUrl: 'signin.html',
          controller: 'signin'
        
    })

  .state('signup', {
    url: '/signup',
  
        templateUrl: 'signup.html',
        controller: 'SignupCtrl'
      
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'profile.html',
        controller: 'ProfileCtrl'
      }
    },
    params:{'user_id' : ':user_id' , 'command' : ':profile'}
  })
  .state('app.tourDetail', {
    url: '/tourDetail?plan_id',
    views: {
      'menuContent': {
        templateUrl: 'tour-details.html',
        controller: 'tourDetailCtrl'
      }
    },
    params: {'plan_id' : ':plan_id' , 'command' : ':tourDetail'}
  });

// if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});
 