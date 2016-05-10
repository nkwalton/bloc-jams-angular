
 (function() {
     function SongPlayer() {
         
          var SongPlayer = {};
         
             /**
             * @desc currentSong variable (empty); to compare against song or other variables.
             * @type {0bject}.
             */
          var currentSong = null;
             
             /**
             * @desc Buzz object audio file.
             * @type {Object}.
             */
          var currentBuzzObject = null;
          
            /**
            * @function setSong.
            * @desc Stops currently playing song and loads new audio file as currentBuzzObject.
            * @param {Object} song.
            */
          var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
                }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
          };
         
            // private playSong function.
            /**
            @function playSong.
            @desc plays (song) audio file.
            @param {object} song.
            */
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         };
         
          // below we add a public, play method to our SongPlayer service we created in the AlbumCtrl.
          /**
          * @function SongPlayer.play
          * @desc setSong function with (song) parameter, calls (song) on the playSong function.
          */
          SongPlayer.play = function(song) {
              
             if (currentSong !== song) {
                 setSong(song);
                 playSong(song);
             }
          };
         
         // the public,pause method, implemented when a user clicks pause button.
         /**
         * @function SongPlayer.pause
         * @desc pause audio file, update playing status --> false.
         */
          SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
          };
         
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();

//Like the Fixtures service, within the SongPlayer service we create a variable and set it to an empty object. The service returns this object, making its properties and methods public to the rest of the application.

//how our play method works: The play method takes an argument, song, which we'll get from the Album view when a user clicks the play button; the ngRepeat directive used in the Album view template will dictate which song to pass into the function. The play method creates a new Buzz object using the song's audioUrl property and then calls Buzz's own play method on the object.

// refactor the play method:  First, we declare new variables named currentSong and currentBuzzObject and set their values to null, which is what we did in the foundation. We've removed the currentBuzzObject variable declaration from the local scope of the play method because we anticipate needing to access this variable elsewhere in the service.

//If the currently playing song is not the same as the song the user clicks on, then we want to:
//
//Stop the currently playing song, if there is one.
//Set a new Buzz sound object.
//Set the newly chosen song object as the currentSong.
//Play the new Buzz sound object.