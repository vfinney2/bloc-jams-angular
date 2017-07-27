 (function() {
  
   /**
 * @function SongPlayer
 * @desc Is used by the factory service to build a functional play/pause buttons nect to the song titles
 * @returns {Object} SongPlayer
 */
     function SongPlayer(Fixtures) {
          var SongPlayer = {};
  /**
  * @desc Variable set to a function that obtains information about the album. It is used for the next and previous buttons.
  */
          var currentAlbum = Fixtures.getAlbum();
  
 /**
 * @desc Buzz object audio file
 * @type {Object}
 */    
  var currentBuzzObject = null;
       
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
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
       
 /**
 * @function playSong
 * @desc Starts to play a specified song by loading a new audio file as currentBuzzObject
 * @param {Object} song
 */
  
 var playSong = function(song) {
        currentBuzzObject.play();
        song.playing = true;
    };
  
  /**
  * @function getSongIndex
  * @desc Gets the index of a song.
  * @param {Object} song
  * @returns {Number} 
  */
  var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
 };
 
  /**
  * @function stopSong
  * @desc stops song in currentBuzzObject
  * @param {Object} song
  */       
  var stopSong = function(song) {
    currentBuzzObject.stop();
    song.playing = null;
  };
 
    /*
 * @desc variable that is set to the song object
 * @type {Object}
 */
  SongPlayer.currentSong = null;
   /*
 * @function a function in SongPlayer object
 * @desc Identifies which song to play and plays it
 * @param {Object} song
 */     
  SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);  
             } else if (SongPlayer.currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             playSong(song);
         }
       } 
     };

  /*
  * @function a function in SongPlayer object
  * @desc Pauses a song
  * @param {Object} song
  */
 SongPlayer.pause = function(song) {
     song = song || SongPlayer.currentSong;
     currentBuzzObject.pause();
     song.playing = false;
 };

   /*
  * @function a function in SongPlayer object
  * @desc Skips to the previous song.
  */
 SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
        
     if (currentSongIndex < 0) {
         stopSong(SongPlayer.currentSong);
     } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };
 
 /*
  * @function in SongPlayer object
  * @desc Plays the next song if the next button on the player bar is clicked
  * If the last song is playing when the next button is clicked, the current song will   stop
  */      
 SongPlayer.next = function() {
    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    currentSongIndex++;
          
    if (currentSongIndex > currentAlbum.songs.length-1) {
       stopSong(SongPlayer.currentSong);
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
         .factory('SongPlayer', ['Fixtures' , SongPlayer]);
 })();