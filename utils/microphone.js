export class Microphone {
    constructor() {
        this.initialized = false;
        this.audioContext = null;
        this.microphone = null;
        this.analyser = null;
        this.dataArray = null;
    }

    initialize() {
        return new Promise((resolve, reject) => {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    this.audioContext = new (window.AudioContext ||
                        window.webkitAudioContext)();
                    this.microphone =
                        this.audioContext.createMediaStreamSource(stream);
                    this.analyser = this.audioContext.createAnalyser();
                    this.analyser.fftSize = 512;
                    const bufferLength = this.analyser.frequencyBinCount;
                    this.dataArray = new Uint8Array(bufferLength);
                    this.microphone.connect(this.analyser);
                    this.initialized = true;
                    resolve();
                })
                .catch((err) => reject(err));
        });
    }

    getSamples() {
        this.analyser.getByteTimeDomainData(this.dataArray);

        let normSamples = [...this.dataArray].map((e) => e / 128 - 1);

        return normSamples;
    }

    getVolume() {
        this.analyser.getByteTimeDomainData(this.dataArray);

        let normSamples = [...this.dataArray].map((e) => e / 128 - 1);

        let sum = 0;

        for (let i = 0; i < normSamples.length; i++) {
            sum += normSamples[i] * normSamples[i];
        }

        let volume = Math.sqrt(sum / normSamples.length);

        return volume;
    }
}

export class Bar {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    update(micInput) {
        this.height = micInput * 128;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}