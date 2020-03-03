import { BaseControls } from './baseControls';
import { DIRECTIONS } from '../components/snake';
export class TouchControls extends BaseControls {
  static bootstrap(onSetDirection, target) {
    const controls = new TouchControls(onSetDirection, target);
    controls.init();
    return controls;
  }

  calcDelta(dS, dE) {
    return dS > dE;
  }

  addEventListeners() {
    this.target.addEventListener('touchstart', e => {
      const [touch] = e.touches;
      if (!touch) {
        return;
      }
      const { pageX: x, pageY: y } = touch;
      this.coordsStart = { x, y };
      console.log(this.coordsStart);
    });

    this.target.addEventListener('touchend', e => {
      const [touch] = e.changedTouches;
      if (!touch) {
        return;
      }
      const { pageX: x, pageY: y } = touch;
      if (this.coordsStart.y > y) {
        this.onSetDirection(DIRECTIONS.TOP);
        return;
      }
      if (this.coordsStart.y < y) {
        this.onSetDirection(DIRECTIONS.BOTTOM);
      }
    });
  }

  init() {
    this.addEventListeners();
  }

  clear() {
    console.log('CLEAR');
  }
}
