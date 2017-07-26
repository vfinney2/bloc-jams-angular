 (function() {
  
   /**
 * @function SongPlayer
 * @desc Is used by the factory service to build a functional play/pause buttons nect to the song titles
 * @returns {Object} SongPlayer
 */
     function SongPlayer() {
          var SongPlayer = {};
  
  /*
 * @desc variable that is set to the song object
 * @type {Object}
 */
  var currentSong = null;
  
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
        currentSong.playing = null;
    }
 
    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
 
    currentSong = song;
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
      
   /*
 * @function a function in SongPlayer object
 * @desc Identifies which song to play and plays it
 * @param {Object} song
 */     
  SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);  
             } else if (currentSong === song) {
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
     currentBuzzObject.pause();
     song.playing = false;
 };
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();