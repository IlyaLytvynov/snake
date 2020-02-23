import { GameField } from './gameField';
import { Score } from './score';
import { WelcomeScreen } from './welcomeScreen';
/**
 * @typedef Params
 * @param {DOMElement} root
 * @param {Number} width
 * @param {Number} height
 */

export const GAME_MODES = {
  PENDING: 0,
  STARTED: 1
};
export class Stage {
  /**
   * @param {DOMElement} root
   * @param {Number} width
   * @param {Number} height
   */
  static create(options) {
    const stage = new Stage(options);
    stage.init();
    return stage;
  }

  /**
   * @param {object} o
   * @param {DOMElement} o.root
   * @param {Number} o.width
   * @param {Number} o.height
   * @param {function} o.onWelcomeScreenClick
   */
  constructor({ root, width = 320, height = 480, onWelcomeScreenClick }) {
    this.cellW = 16;
    this.cellH = 16;

    this.root = root;
    this.width = width;
    this.height = height;
    this.mode = GAME_MODES.PENDING;
    this.onWelcomeScreenClick = onWelcomeScreenClick;
  }

  get heightInCells() {
    return this.field.heightInCells;
  }

  get widthInCells() {
    return this.field.widthInCells;
  }

  get cellSize() {
    return { w: this.cellW, h: this.cellH };
  }

  setMode(gameMode) {
    this.mode = gameMode;
    this.render();
  }

  getRandomCell() {
    const col = Math.ceil(Math.random() * this.widthInCells - 1);
    const row = Math.ceil(Math.random() * this.heightInCells - 1);
    return { col, row };
  }

  isEat({ col, row }) {
    return this.field.checkApple({ col, row });
  }

  updateApple() {
    this.appleCoords = this.getRandomCell();
  }

  /**
   *
   * @param {Object} coords
   * @param {number} coords.col
   * @param {number} coords.row
   */
  renderApple() {
    if (!this.appleCoords) {
      this.updateApple();
    }
    this.field.renderApple(this.appleCoords);
  }

  /**
   * @returns {DOMElement}
   */
  init() {
    this.createCanvas();
    this.render();
  }

  renderWelcomeScreen() {
    this.welcomeScreen = WelcomeScreen.create({
      canvas: this.canvas,
      w: this.width,
      h: this.height,
      onClick: this.onWelcomeScreenClick
    });
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.border = '1px solid red';

    this.root.appendChild(this.canvas);
  }

  render() {
    switch (this.mode) {
      case GAME_MODES.STARTED:
        this.drawField();
        this.renderApple();
        this.drawScore();
        break;
      case GAME_MODES.PENDING: {
        this.renderWelcomeScreen();
        break;
      }
    }
  }

  drawScore() {
    this.score = Score.create({ canvas: this.canvas, score: this.score });
  }

  drawField() {
    this.field = GameField.create({
      canvas: this.canvas,
      width: this.width,
      height: this.height,
      cellH: this.cellH,
      cellW: this.cellW
    });
  }
}
