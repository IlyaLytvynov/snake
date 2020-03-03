import { Cell } from './cell';
import { ACCENT } from '../utils/palette';

export class Apple extends Cell {
  static create(options) {
    const apple = new Apple(options);
    apple.render();
    return apple;
  }

  constructor(options) {
    super({ ...options, bgColor: ACCENT });
    this.intervalId = null;
  }

  startShineInterval() {
    window.clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.bgColor = 'yellow';
    }, 100);
  }
}
