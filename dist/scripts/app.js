// The root module will act as a container for different parts of our application. The first argument passed, blocJams, is the prescribed name of the module. The empty array, passed as the second argument, injects dependencies into an application. 
(function() {
     function config($stateProvider, $locationProvider) {
         $locationProvider
         .html5Mode({
             enabled: true,
             requireBase: false
         });
         
         $stateProvider
         .state('landing', {
             url: '/',
             templateUrl: '/templates/landing.html'
         })
         
         .state('album', {
             url: '/album',
             templateUrl: '/templates/album.html'
         });
     }
 
     angular
         .module('blocJams', ['ui.router'])
         .config(config);
 })();

//$statProvider: to configure the state behavior.
// $localProvider: to configure how the application handles URLs in the browser.

//To make sure the providers are accessible throughout the application, inject them using the config block on the application's root module. Write a config function to pass into the config() function