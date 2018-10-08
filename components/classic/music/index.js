import { classicBeh } from '../classic-beh.js'
const BackgroundAudioManager = wx.getBackgroundAudioManager();

Component({
    behaviors: [classicBeh],
    properties: {
        src: {
            type: String,
            value: ''
        }
    },
    data: {
        playing: false,
        playSrc: 'images/player@play.png',
        pauseSrc: 'images/player@pause.png'
    },
    attached() {        
        this._recoverStatus();
        this._monitorSwitch();
    },
    methods: {
        onPlay() {
            if (!this.data.playing) {
                this.setData({
                    playing: true
                });
                BackgroundAudioManager.src = this.properties.src;   
            } else {
                this.setData({
                    playing: false
                });
                BackgroundAudioManager.pause();
            }

        },
        _recoverStatus() {            
            if (BackgroundAudioManager.paused) {                
                this.setData({
                    playing: false
                });
                return;
            }
            if (BackgroundAudioManager.src === this.properties.src) {
                this.setData({
                    playing: true
                });
            }
        },
        _monitorSwitch() {
            BackgroundAudioManager.onPlay(() => {                
                this._recoverStatus();
            });
            BackgroundAudioManager.onPause(() => {                
                this._recoverStatus();
            });
            BackgroundAudioManager.onStop(() => {                
                this._recoverStatus();
            });
            BackgroundAudioManager.onEnded(() => {
                this._recoverStatus();
            });
        }
    }   
})