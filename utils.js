function playAudio(audio) {
    if (audio) {
        audio.volume = 0.1;
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

function isWholeNumber(n) {
    return (n - Math.floor(n)) === 0;
}

function randomNumber(minimum, maximum) {
    minimum = Math.ceil(minimum);
    maximum = Math.floor(maximum);
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function generateId() {
    return Math.random().toString(16).slice(5);
}
