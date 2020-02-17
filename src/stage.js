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
    this._cellW = 16;
    this._cellH = 16;

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

  get apple() {
    return this._apple;
  }

  checkApple(col, row) {
    return this._apple.col === col && this._apple.row === row;
  }

  /**
   *
   * @param {Object} coords
   * @param {number} coords.col
   * @param {number} coords.row
   */
  renderApple({ col, row }) {
    this._apple = Cell.createWithColor({
      canvas: this._canvas,
      col,
      row,
      w: this._cellW,
      h: this._cellH,
      bgColor: 'red'
    });
  }

  /**
   * @returns {DOMElement}
   */
  init() {
    this._canvas = document.createElement('canvas');
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    this._canvas.style.border = '1px solid red';

    this._mp.appendChild(this._canvas);
    return this._canvas;
  }

  render() {
    this.drawField();
  }

  drawField() {
    for (let row = 0; row < this.heightInCells; row += 1) {
      for (let col = 0; col < this.widthInCells; col += 1) {
        Cell.create({
          canvas: this._canvas,
          col,
          row,
          w: this._cellW,
          h: this._cellH
        });
      }
    }
  }
}
