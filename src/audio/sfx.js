import { Howler, Howl } from 'howler'

const hitWav = 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=='
const gameOverWav = 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=='
const startWav = 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=='
const bgmWav = 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=='

export const sfx = {
  hit: new Howl({ src: [hitWav], volume: 0.5 }),
  gameOver: new Howl({ src: [gameOverWav], volume: 0.6 }),
  start: new Howl({ src: [startWav], volume: 0.5 }),
  bgm: new Howl({ src: [bgmWav], volume: 0.15, loop: true }),

  play(sound) {
    if (this[sound]) {
      this[sound].play()
    }
  },

  startBGM() {
    if (!this.bgm.playing()) {
      this.bgm.play()
    }
  },

  stopBGM() {
    this.bgm.stop()
  },

  setVolume(vol) {
    Howler.volume(vol)
  },
}
