import { Cell } from './cell.js';
import { Apple } from './apple';

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
    const stage = new GameField({ ...options });
    stage.render();
    return stage;
  }

  /**
   * @param {DOMElement} mp
   * @param {Number} width
   * @param {Number} height
   */
  constructor({ canvas, width, height, cellSize }) {
    this.cellSize = cellSize;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.heightInCells = Math.floor(this.height / this.cellSize);
    this.widthInCells = Math.floor(this.width / this.cellSize);
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
    this.apple = Apple.create({
      canvas: this.canvas,
      col,
      row,
      w: this.cellSize,
      h: this.cellSize
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
          w: this.cellSize,
          h: this.cellSize
        });
      }
    }
  }
}
