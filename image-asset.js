function ImageAsset(src) {
    this.img = new Image();
    this.img.src = src;
    this.loaded = false;
    this.img.onload = () => {
        this.loaded = true;
    }
}

ImageAsset.prototype.isLoaded = function() {
    return this.loaded;
}

ImageAsset.prototype.getElement = function() {
    return this.img;
}
