export class Text {
  /**
   * @param {object} options
   * @param {HTMLCanvasElement} options.root
   */
  static create(options) {
    const score = new Text(options);
    score.render();
    return score;
  }

  /**
   * @param {object} options
   * @param {HTMLCanvasElement} options.root
   */
  constructor({
    canvas,
    x = 0,
    y = 0,
    w,
    h = 22,
    textContent,
    color = 'red',
    textAlign = 'left'
  }) {
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.textColor = color;
    this.textContent = textContent;
    this.textAlign = textAlign;
  }

  render() {
    this.ctx.fillStyle = this.textColor;
    this.ctx.font = `${this.h}px Helvetica`;
    this.ctx.textAlign = this.textAlign;
    this.ctx.fillText(this.textContent, this.x, this.y + this.h);
  }

  setText(textContent) {
    this.textContent = textContent;
  }

  setAlign(align) {
    this.textAlign = align;
  }

  setColor(color) {
    this.textColor = color;
  }
}
