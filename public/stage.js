import { Cell } from './cell.js';
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
  static create(mp, w = 640, h = 640) {
    return new Stage(mp, w, h);
  }

  /**
   * @param {DOMElement} mp
   * @param {Number} width
   * @param {Number} height
   */
  constructor(mp, width, height) {
    this._cellW = 32;
    this._cellH = 32;

    this._mp = mp;
    this._width = width;
    this._height = height;
  }
  get canvas() {
    return this._canvas;
  }

  get heightInCells() {
    return this._height / this._cellH;
  }

  get widthInCells() {
    return this._width / this._cellW;
  }

  get cellSize() {
    return { w: this._cellW, h: this._cellH };
  }

  /**
   * @returns {DOMElement}
   */
  render() {
    this._canvas = document.createElement('canvas');
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    this._canvas.style.border = '1px solid red';

    this._mp.appendChild(this._canvas);
    this.drawField();
    return this._canvas;
  }

  drawField() {
    for (let row = 0; row < this.heightInCells; row++) {
      for (let col = 0; col < this.widthInCells; col++) {
        const cell = new Cell(this._canvas, col, row, this._cellW, this._cellH);
        cell.render();
      }
    }
  }
}
