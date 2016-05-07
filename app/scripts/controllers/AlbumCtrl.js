(function() {
     function AlbumCtrl() {
        this.albumData = albumPicasso; //this data is now added to AlbumCtrl's $scope object.
         
// we just added a copy of albumPicasso to albumData property on the AlbumCtrl's $scope object. $scope properties contain the model, or data, that the view will present, and are available to the template at the point in the DOM where the controller is registered. 
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();
