import { DIRECTIONS } from '../components/snake';
import { BaseControls } from './baseControls';

const KEYS = {
  UP: 'w',
  DOWN: 's',
  LEFT: 'a',
  RIGHT: 'd'
};
export class KeyboardControls extends BaseControls {
  static bootstrap(onSetDirection, target) {
    const controls = new KeyboardControls(onSetDirection, target);
    controls.init();
    return controls;
  }

  constructor(...options) {
    super(...options);
    this.setDirection = this.setDirection.bind(this);
  }

  setDirection(e) {
    switch (e.key) {
      case KEYS.DOWN:
        this.onSetDirection(DIRECTIONS.BOTTOM);
        break;
      case KEYS.UP:
        this.onSetDirection(DIRECTIONS.TOP);
        break;
      case KEYS.RIGHT:
        this.onSetDirection(DIRECTIONS.RIGHT);
        break;
      case KEYS.LEFT:
        this.onSetDirection(DIRECTIONS.LEFT);
        break;
    }
  }

  init() {
    this.target.addEventListener('keydown', this.setDirection);
  }

  clear() {
    this.target.removeEventListener('keydown', this.setDirection);
  }
}
