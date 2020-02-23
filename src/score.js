import { Text } from './text';

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
    this.textContent = options.score;
  }

  setScore(score) {
    this.textContent = `${score}`;
  }
}
