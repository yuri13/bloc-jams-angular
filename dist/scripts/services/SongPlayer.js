(function() {
     function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        /**
        * @function
        * @desc Uses getAlbum to store album information
        */
         
        var currentAlbum = Fixtures.getAlbum();
         
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
        * @function getSongIndex
        * @desc Get the index of a song
        * @param {Object} song
        */ 
         
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };  
         
        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */ 
         
        SongPlayer.currentSong = null;
         
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
            song = song || SongPlayer.currentSong;
            if (currentSong !== song) { 
            
            setSong(song);
            playSong(song);
            
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
            }
        }
    };
        
        /**
        * @function pause
        * @desc Pauses the selected song
        * @param {Object} song
        */
        
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function previous
        * @desc Selects previous song
        */
         
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
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
