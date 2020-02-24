import { Text } from './text';

export class NotificationScreen {
  static create(options) {
    const screen = new NotificationScreen(options);
    screen.addEventListeners();
    screen.render();
    return screen;
  }

  constructor({ canvas, w, h, textContent, textColor, onClick }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = 0;
    this.y = 0;
    this.w = w;
    this.h = h;
    this.textContent = textContent;
    this.textColor = textColor;
    this.onClick = onClick;
    this.clickHandler = this.clickHandler.bind(this);
  }

  render() {
    this.drawBackground();
    this.renderText();
  }

  renderText() {
    this.text = Text.create({
      canvas: this.canvas,
      x: this.w / 2,
      y: this.h / 2,
      textContent: this.textContent,
      textAlign: 'center',
      textColor: this.textColor
    });
  }

  drawBackground() {
    this.ctx.fillStyle = 'rgba(0,0,0, .2)';
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  clickHandler() {
    this.onClick();
    this.canvas.removeEventListener('click', this.clickHandler);
  }

  addEventListeners() {
    this.canvas.addEventListener('click', this.clickHandler);
  }
}
