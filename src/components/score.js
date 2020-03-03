import { Text } from './text';
import { normalizeScore } from '../utils/converters';
export class Score extends Text {
  /**
   * @param {object} options
   * @param {HTMLCanvasElement} options.root
   */
  static create(options) {
    const score = new Score(options);
    score.render();
    return score;
  }

  /**
   * @param {object} options
   * @param {HTMLCanvasElement} options.root
   */
  constructor(options) {
    super(options);
    this.textContent = normalizeScore(options.score);
    this.textColor = 'magenta';
    this.x = 10;
  }

  setScore(score) {
    this.textContent = normalizeScore(score);
  }
}
