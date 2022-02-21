class SoundManager {
    constructor() {
        this.gainNode = null;
        this.clips = {};
        this.context = null;
        this.loaded = false;
    }

    init() {
        this.context = new AudioContext();
        this.gainNode = this.context.createGain()
        this.gainNode.connect(this.context.destination);
    }

    load(path, callback) {
        if (this.clips[path]) {
            callback(this.clips[path]);
            return;
        }
        const clip = {path: path, buffer: null, loaded: false};
        clip.play = (volume, loop) => {
            this.play(clip.path, {looping: loop ? loop : false, volume: volume ? volume : 1});
        };
        this.clips[path] = clip;
        const request = new XMLHttpRequest();
        request.open('GET', path, true);
        request.responseType = 'arraybuffer';
        request.onload = () => {
            this.context.decodeAudioData(request.response, function (buffer) {
                clip.buffer = buffer;
                clip.loaded = true;
                callback(clip);
            }).then(r => {});
        };
        request.send();
    }

    loadArray(array) {
        for (let i = 0; i < array.length; i++) {
            this.load(array[i], () => {
                if (array.length === Object.keys(this.clips).length) {
                    for (let sd in this.clips)
                        if (!this.clips[sd].loaded)
                            return;
                    this.loaded = true;
                }
            });
        }
    }

    play(path, settings) {
        if (!this.loaded) {
            setTimeout(() => {
                this.play(path, settings);
            }, 1000);
            return;
        }
        let looping = settings? (settings.looping? settings.looping : false ) : false;
        let volume = settings? (settings.volume? settings.volume : 1 ) : 1;
        let sd = this.clips[path];
        if (sd === null)
            return false;
        const sound = this.context.createBufferSource();
        sound.buffer = sd.buffer;
        sound.connect(this.gainNode);
        sound.loop = looping;
        this.gainNode.gain.value = volume;
        sound.start(0);
        return true;
    }

    disconnect() {
        this.gainNode.disconnect();
    }
}