import { theme } from '../utils/palette';

export class Cell {
  static createWithColor({ bgColor, ...options }) {
    const cell = new Cell(options);
    cell.color = bgColor;
    cell.render();
    return cell;
  }

  static create(options) {
    const cell = new Cell(options);
    cell.render();
    return cell;
  }

  constructor({ canvas, col, row, w, h, scale, bgColor = theme.bg }) {
    this.ctx = canvas.getContext('2d');
    this.ctx.scale(scale, scale);
    this.w = w;
    this.h = h;
    this.scale = scale;
    this.col = col;
    this.row = row;
    this.x = col * this.w;
    this.y = row * this.h;
    this.color = bgColor;
  }

  /**
   * *
   * @param {string} color
   */
  set color(color) {
    this.ctx.fillStyle = color;
  }

  get color() {
    return this.ctx.fillStyle;
  }

  render() {
    this.fillStyle = this.bgColor;
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.ctx.strokeStyle = theme.bg;
    this.ctx.strokeRect(this.x, this.y, this.w, this.h);
  }

  clear() {
    this.setDefaultColor();
    this.render();
  }

  setDefaultColor() {
    this.ctx.fillStyle = theme.bg;
  }
}
