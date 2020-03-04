import { BaseControls } from './baseControls';
import { DIRECTIONS } from '../components/snake';
export class TouchControls extends BaseControls {
  static bootstrap(onSetDirection, target) {
    const controls = new TouchControls(onSetDirection, target);
    controls.init();
    return controls;
  }

  addEventListeners() {
    this.target.addEventListener('touchstart', e => {
      const [touch] = e.touches;
      if (!touch) {
        return;
      }
      const { pageX: x, pageY: y } = touch;
      this.startCoords = { x, y };
      console.log(this.startCoords);
    });

    this.target.addEventListener('touchend', e => {
      const [touch] = e.changedTouches;
      if (!touch) {
        return;
      }
      const { pageX: x, pageY: y } = touch;
      this.endCoords = { x, y };
      this.setDirection();
    });
  }

  setDirection() {
    const dX = this.calcDelta(this.startCoords.x, this.endCoords.x);
    const dY = this.calcDelta(this.startCoords.y, this.endCoords.y);
    console.log(dX, dY);
    if (Math.abs(dX) > Math.abs(dY)) {
      this.setHorisontalDirection(dX);
      return;
    }
    this.setVerticalDirection(dY);
  }

  setHorisontalDirection(dX) {
    if (dX > 0) {
      this.onSetDirection(DIRECTIONS.LEFT);
      return;
    }
    this.onSetDirection(DIRECTIONS.RIGHT);
  }

  setVerticalDirection(dY) {
    if (dY > 0) {
      this.onSetDirection(DIRECTIONS.TOP);
      return;
    }
    this.onSetDirection(DIRECTIONS.BOTTOM);
  }

  calcDelta(prev, current) {
    if (Math.abs(prev - current) < 10) {
      return 0;
    }
    return prev - current;
  }

  init() {
    this.addEventListeners();
  }

  clear() {
    console.log('CLEAR');
  }
}
