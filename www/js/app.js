// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
    angular.module('starter', ['ionic', 'starter.controllers'])
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
//<<<<<<< HEAD
        }
      }
    })
   .state('app.uptours', {
      url: '/uptours',
      views: {
        'menuContent': {
          templateUrl: 'uptours.html',
            controller: 'UptoursCtrl'
//=======
//>>>>>>> origin/master
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
   .state('profile', {
    url: '/profile',
    templateUrl: 'profile.html',
      controller: 'ProfileCtrl'
  })

//  .state('app.brow', {
//      url: '/brow',
//      views: {
//        'menuContent': {
//          templateUrl: 'brow.html',
//            controller: 'BrowCtrl'
//         
//        }
//      }
//    })
  .state('app.single', {
    url: '/profile/:profileId',
    views: {
      'menuContent': {
        templateUrl: 'profile.html',
        controller: 'ProfileCtrl'
      }
    }
  });

   
   

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
