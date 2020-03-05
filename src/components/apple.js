import { Cell } from './cell';
import { theme } from '../utils/palette';

export class Apple extends Cell {
  static create(options) {
    const apple = new Apple(options);
    apple.render();
    return apple;
  }

  constructor(options) {
    super({ ...options, bgColor: theme.apple });
    this.intervalId = null;
  }

  startShineInterval() {
    window.clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.bgColor = 'yellow';
    }, 100);
  }
}
