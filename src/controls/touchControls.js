import { BaseControls } from './baseControls';
import { DIRECTIONS } from '../components/snake';
export class TouchControls extends BaseControls {
  static bootstrap(onSetDirection, target) {
    const controls = new TouchControls(onSetDirection, target);
    controls.init();
    return controls;
  }

  constructor(...options) {
    super(...options);
    this.handelToushStart = this.handelToushStart.bind(this);
    this.handelTouchEnd = this.handelTouchEnd.bind(this);
  }

  handelToushStart(e) {
    const [touch] = e.touches;
    if (!touch) {
      return;
    }
    const { pageX: x, pageY: y } = touch;
    this.startCoords = { x, y };
    console.log(this.startCoords);
  }

  handelTouchEnd(e) {
    const [touch] = e.changedTouches;
    if (!touch) {
      return;
    }
    const { pageX: x, pageY: y } = touch;
    this.endCoords = { x, y };
    this.setDirection();
  }

  addEventListeners() {
    console.log(this);
    this.target.addEventListener('touchstart', this.handelToushStart);
    this.target.addEventListener('touchend', this.handelTouchEnd);
  }

  setDirection() {
    const dX = this.calcDelta(this.startCoords.x, this.endCoords.x);
    const dY = this.calcDelta(this.startCoords.y, this.endCoords.y);
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
    this.target.removeEventListener('touchstart', this.handelToushStart);
    this.target.removeEventListener('touchend', this.handelTouchEnd);
  }
}
