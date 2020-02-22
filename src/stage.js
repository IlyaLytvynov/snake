import { GameField } from './gameField.js';
/**
 * @typedef Params
 * @param {DOMElement} mp
 * @param {Number} width
 * @param {Number} height
 */

export class Stage {
  /**
   * @param {DOMElement} mp
   * @param {Number} width
   * @param {Number} height
   */
  static create(mp, w = 320, h = 320) {
    const stage = new Stage(mp, w, h);
    stage.init();
    return stage;
  }

  /**
   * @param {DOMElement} mp
   * @param {Number} width
   * @param {Number} height
   */
  constructor(mp, width, height) {
    this.cellW = 16;
    this.cellH = 16;

    this.mp = mp;
    this.width = width;
    this.height = height;
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

  get apple() {
    return this.field.apple;
  }

  isEat({ col, row }) {
    return this.field.checkApple({ col, row });
  }

  /**
   *
   * @param {Object} coords
   * @param {number} coords.col
   * @param {number} coords.row
   */
  renderApple(coords) {
    this.field.renderApple(coords);
  }

  /**
   * @returns {DOMElement}
   */
  init() {
    this.createCanvas();
    this.drawField();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.border = '1px solid red';

    this.mp.appendChild(this.canvas);
  }

  render() {
    this.drawField();
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
