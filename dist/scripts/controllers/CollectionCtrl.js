(function() {
    function CollectionCtrl() {
        this.albums = [];
        for (var i=0; i < 12; i++) {
            this.albums.push(angular.copy(albumPicasso));
        }
    }
    //we refactored the old bloc jams code that used a DOM element, with a for loop to append a new album cover thumbnail. now, we bind the data from the albumPicasso object (fixtures.js), to the collection template.  angular.copy is one of several global function components on the angular object. the .push pushed copies of the album to the array, as it goes through the for loop.
    
    
    
    
    angular
        .module('blocJams')
        .controller('CollectionCtrl', CollectionCtrl);
}) ();

//here we define a controller for the collection view.  we must call .controller on an Angular module. the .contoller method has two parameters ('CollectionCtrl' is the name of the controller, and the CollectionCtrl is a callback.) 