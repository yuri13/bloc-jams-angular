(function() {
     function SongPlayer() {
        var SongPlayer = {};
        
        /**
        * @desc Object containing song data
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
        * @desc Stops currently playing song and Loads new audio file as currentBuzzObject
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
        * @desc Plays current Buzz Object and sets to true the playing status of the song
        * @param {Object} song
        */
         
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
            
        };
         
        /**
        * @function play
        * @desc Plays the selected song by calling the setSong and playSong functions
        * @param {Object} song
        */
         
        SongPlayer.play = function(song) {
             
            if (currentSong !== song) { 
            
            setSong(song);
            playSong(song);
            
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
            }
        }
    };
        
        /**
        * @function pause
        * @desc Pauses the selected song
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
