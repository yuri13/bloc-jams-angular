(function() {
     function timecode() {
         return function(seconds) {
             
            var seconds = mySound.getTime(seconds);
             
            if (Number.isNaN(seconds)) {
                return '-:--';
            }
             
            var timer = buzz.toTimer(mySound.getTime(seconds));
 
             
             return timer;
         };
     }
 
     angular
         .module('blocJams')
         .filter('timecode', timecode);
})();
