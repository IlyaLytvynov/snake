import { DIRECTIONS } from '../components/snake.js/index.js';

export class KeyboardControls {
  static bootstrap(onSetDirection) {
    const controls = new KeyboardControls(onSetDirection);
    controls.init();
    return controls;
  }

  constructor(onSetDirection) {
    this.onSetDirection = onSetDirection;
    this.addEventListeners = this.addEventListeners.bind(this);
  }

  addEventListeners(e) {
    switch (e.key) {
      case 's':
        this.onSetDirection(DIRECTIONS.BOTTOM);
        break;
      case 'w':
        this.onSetDirection(DIRECTIONS.TOP);
        break;
      case 'd':
        this.onSetDirection(DIRECTIONS.RIGHT);
        break;
      case 'a':
        this.onSetDirection(DIRECTIONS.LEFT);
        break;
    }
  }

  init() {
    document.addEventListener('keydown', this.addEventListeners);
  }

  clear() {
    document.removeEventListener('keydown', this.addEventListeners);
  }
}
