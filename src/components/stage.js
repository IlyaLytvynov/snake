import { GameField } from './gameField';
import { Score } from './score';
import { NotificationScreen } from './notificationScreen';
import { Screen } from '../utils/screen';
import { sizeGenerator } from '../utils/converters';
/**
 * @typedef Params
 * @param {DOMElement} root
 * @param {Number} width
 * @param {Number} height
 */

export const GAME_MODES = {
  PENDING: 0,
  STARTED: 1,
  OVER: 2
};
export class Stage {
  /**
   * @param {DOMElement} root
   */
  static create(options) {
    const sizes = sizeGenerator(Screen.getViewportSize());
    const stage = new Stage({ ...options, ...sizes });
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
  constructor({ root, onWelcomeScreenClick, width, height, cellSize, scale }) {
    this.root = root;
    this.mode = GAME_MODES.PENDING;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.cellSize = cellSize;
    this.onWelcomeScreenClick = onWelcomeScreenClick;
  }

  get heightInCells() {
    return this.field.heightInCells;
  }

  get widthInCells() {
    return this.field.widthInCells;
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
    this.notificationScreen = NotificationScreen.create({
      canvas: this.canvas,
      scale: this.scale,
      w: this.width,
      h: this.height,
      textContent: 'START GAME',
      onClick: this.onWelcomeScreenClick
    });
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.canvas.width = this.width * this.scale;
    this.canvas.height = this.height * this.scale;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(this.scale, this.scale);
    this.root.appendChild(this.canvas);
  }

  render() {
    switch (this.mode) {
      case GAME_MODES.STARTED:
        this.drawField();
        this.renderApple();
        this.drawScore();
        break;
      case GAME_MODES.PENDING:
        this.renderWelcomeScreen();
        break;
      case GAME_MODES.OVER:
        this.renderGameOverScreen();
        break;
    }
  }

  drawScore() {
    this.score = Score.create({ canvas: this.canvas, score: this.score });
  }

  renderGameOverScreen() {
    this.notificationScreen = NotificationScreen.create({
      canvas: this.canvas,
      textContent: 'GAME OVER',
      scale: this.scale,
      w: this.width,
      h: this.height,
      textColor: 'magenta',
      onClick: this.onWelcomeScreenClick
    });
  }

  drawField() {
    this.field = GameField.create({
      canvas: this.canvas,
      scale: this.scale,
      width: this.width,
      height: this.height,
      cellSize: this.cellSize
    });
  }
}
