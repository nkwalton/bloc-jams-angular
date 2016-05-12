//For directives, the callback function (in this case, seekBar) is a factory function. It returns an object that describes the directive's behavior to Angular's HTML compiler. This object communicates the behavior through options.

(function() {
     function seekBar($document) {
         
            /**
            * @function calculatePercentage (private).
            * @desc Calculates the horizontal percent along the seek bar where the event (passed in from         the view as $event) occurred.
            * @param seekBar {object}, event {object}.
            * @returns {number}
            */
            // event (passed in from the view as $event) occurred
         var calculatePercent = function(seekBar, event) {
             var offsetX = event.pageX - seekBar.offset().left;
             var seekBarWidth = seekBar.width();
             var offsetXPercent = offsetX / seekBarWidth;
             offsetXPercent = Math.max(0, offsetXPercent);
             offsetXPercent = Math.min(1, offsetXPercent);
             return offsetXPercent;
         };
         
         return {
             templateUrl: '/templates/directives/seek_bar.html',
             replace: true,
             restrict: 'E',
             scope: { },
             link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;
             
             /**
             * @desc Holds the element that matches the directive (<seek-bar>) as a jQuery object so we   can call jQuery methods on it.
             * @type {object}.
             */
             var seekBar = $(element);
 
                /**
                * @function percentString (private).
                * @desc function that calculates a percent based on the value and maximum value of a        seek bar.
                * @returns {number}
                */      
             var percentString = function () {
                 var value = scope.value;
                 var max = scope.max;
                 var percent = value / max * 100;
                 return percent + "%";
             };
 
                /**
                * @function fillStyle (public method).
                * @desc method that returns the width of the seek bar fill element based on the calculated percent.
                * @returns {number}
                */  
             scope.fillStyle = function() {
                 return {width: percentString()};
             };
                
                /**
                * @function onClickSeekBar (public method).
                * @desc method that updates the seek bar value based on the seek bar's width and the        location of the user's click on the seek bar.
                * @param event {object}.
                */  
             scope.onClickSeekBar = function(event) {
                 var percent = calculatePercent(seekBar, event);
                 scope.value = percent * scope.max;
             };
                
                /**
                * @function trackThumb (public method).
                * @desc method that uses $apply to constantly apply the change in value of scope.value      as the user drags the seek bar thumb.
                */  
             scope.trackThumb = function() {
                 $document.bind('mousemove.thumb', function(event) {
                     var percent = calculatePercent(seekBar, event);
                     scope.$apply(function() {
                         scope.value = percent * scope.max;
                     });
                 });

                 $document.bind('mouseup.thumb', function() {
                     $document.unbind('mousemove.thumb');
                     $document.unbind('mouseup.thumb');
                 });
             };
             }
         };
     }
 
     angular
         .module('blocJams')
         .directive('seekBar', ['$document', seekBar]);
 })();

