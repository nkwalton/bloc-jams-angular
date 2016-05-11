
 (function() {
     function SongPlayer(Fixtures) {
         
          var SongPlayer = {};
           
         
            /**
            * @desc (private variable) currentAlbum now holds the album information.
            * @type {object} returns album Picasso information.
            */
          var currentAlbum = Fixtures.getAlbum();
         
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
                SongPlayer.currentSong.playing = null;
                }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
          };
         
           // private getSongIndex function.
           /**
           * @function getSongIndex
           * @desc  now that we have access to currentAlbum, (via fixtures service), use this function to      get the index of a song.
           * @param  song {object}.
           * @returns song index, {number}.
           */
          var getSongIndex = function(song) {
                return currentAlbum.songs.indexOf(song);  
          };
         
          //removed old (private), currentSong variable; replaced with public currentSong attribute.
          /**
             * @desc currentSong variable (empty); to compare against song or other variables.
             * @type {0bject}.
             */
          SongPlayer.currentSong = null;
         
            // private playSong function.
            /**
            @function playSong.
            @desc plays (song) audio file. Updates the playing status of song to true.
            @param {object} song.
            */
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         };
         
         
             // private stopSong function.
             /**
             @function stopSong.
             @desc stops (song) audio file.  Upates the playing status of the song to false.
             @param {object} song.
             */
          var stopSong = function(song) {
             currentBuzzObject.stop();
             song.playing = null;
          };
         
          // below we add a public, play method to our SongPlayer service we created in the AlbumCtrl.
          /**
          * @function SongPlayer.play
          * @desc setSong function with (song) parameter, calls (song) on the playSong function.
          */
          SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
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
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
          };
         
           // (public) previous method.
          /**
          * @function  previous
          * @desc  uses the getSongIndex function to get index of currently playing song and decreases that          index by one. The first conditional statement is for if the currently playing song is the          first song, and user hits previous button -  then, song stops, sets value of currently            playing song to first song. the second conditional (else) assumes index > 0, and                  currentSongIndex-- (goes back one song index), sets that song, plays song.
          * @param  SongPlayer.currentSong  {object}. 
          */
          SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;
              
              if (currentSongIndex < 0) {
                 stopSong(song);
              } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
              }
          };
         
          // (public) next method.
          /**
          * @function  next
          * @desc  uses the getSongIndex function to get index of currently playing song and increases      that index by one. The first conditional states: if the currently playing song is greater      than or equal to the last song, and user hits next button -  then, song stops, sets value      of currently playing song to first song. the second conditional (else) assumes index > 0,      and currentSongIndex++ (goes forward one song index), sets that song, plays song.
          * @param  SongPlayer.currentSong  {object}. 
          */
          SongPlayer.next = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;
              
              if (currentSongIndex >= currentAlbum.songs.length) {
                 stopSong(song);
                 SongPlayer.currentSong = currentSongIndex 0;
              } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
              }
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