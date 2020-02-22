import { Cell } from './cell.js';
/**
 * @typedef Params
 * @param {DOMElement} mp
 * @param {Number} width
 * @param {Number} height
 */

export class GameField {
  /**
   * @param {DOMElement} mp
   * @param {Number} width
   * @param {Number} height
   */
  static create(options) {
    const stage = new GameField(options);
    stage.render();
    return stage;
  }

  /**
   * @param {DOMElement} mp
   * @param {Number} width
   * @param {Number} height
   */
  constructor({ canvas, width, height, cellW, cellH }) {
    this.cellW = cellW;
    this.cellH = cellH;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
  }

  get heightInCells() {
    return this.height / this.cellH;
  }

  get widthInCells() {
    return this.width / this.cellW;
  }

  checkApple({ col, row }) {
    return this.apple.col === col && this.apple.row === row;
  }

  /**
   *
   * @param {Object} coords
   * @param {number} coords.col
   * @param {number} coords.row
   */
  renderApple({ col, row }) {
    this.apple = Cell.createWithColor({
      canvas: this.canvas,
      col,
      row,
      w: this.cellW,
      h: this.cellH,
      bgColor: 'red'
    });
  }

  render() {
    this.drawField();
  }

  drawField() {
    for (let row = 0; row < this.heightInCells; row += 1) {
      for (let col = 0; col < this.widthInCells; col += 1) {
        Cell.create({
          canvas: this.canvas,
          col,
          row,
          w: this.cellW,
          h: this.cellH
        });
      }
    }
  }
}
