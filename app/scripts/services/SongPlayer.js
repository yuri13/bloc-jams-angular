(function() {
     function SongPlayer($rootScope, Fixtures) {
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
                stopSong(SongPlayer.currentSong);
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
        // example has SongPlayer.currentSong = song; 
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
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
         
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
        * @function stopSong
        * @desc Stopss current Buzz Object and sets to null the playing status of the song
        * @param {Object} song
        */
         
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
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
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }            
        };
        
        /**
        * @function next
        * @desc Selects next song
        */
         
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex >= SongPlayer.currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }            
        };
         
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
         
        return SongPlayer;
}
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
