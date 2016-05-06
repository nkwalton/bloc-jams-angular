(function() {
     function LandingCtrl() {
        this.heroTitle = "Turn the Music Up!";//this data is now added to LandingCtrl's $scope object.
         
//         Using the this keyword adds heroTitle as a property on the LandingCtrl's $scope object. $scope properties contain the model, or data, that the view will present, and are available to the template at the point in the DOM where the controller is registered. 
     }
 
     angular
         .module('blocJams')
         .controller('LandingCtrl', LandingCtrl);
 })();
