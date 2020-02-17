export class Cell {
  static createWithColor({ canvas, col, row, w, h, bgColor }) {
    const cell = new Cell({ canvas, col, row, w, h });
    cell.color = bgColor;
    cell.render();
    return cell;
  }

  static create({ canvas, col, row, w, h }) {
    const cell = new Cell({ canvas, col, row, w, h });
    cell.render();
    return cell;
  }

  constructor({ canvas, col, row, w, h }) {
    this.ctx = canvas.getContext('2d');
    this.w = w;
    this.h = h;
    this.col = col;
    this.row = row;
    this.x = col * this.w;
    this.y = row * this.h;

    this.setDefaultColor();
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
    this.drawRect();
    this.ctx.strokeStyle = 'grey';
    this.ctx.strokeRect(this.x, this.y, this.w, this.h);
  }

  clear() {
    this.setDefaultColor();
    this.render();
  }

  drawRect() {
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  setDefaultColor() {
    this.ctx.fillStyle = this.col % 2 === 0 ? 'white' : 'white';
  }
}
