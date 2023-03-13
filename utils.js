function playAudio(audio) {
    if (audio) {
        audio.volume = 0.3;
        audio.play();
    }
}

function stopAudio(audio) {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});
