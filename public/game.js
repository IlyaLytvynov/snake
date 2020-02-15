import { Stage } from './stage.js';
import { Snake, DIRECTIONS } from './snake.js';

export class Game {
  /**
   * @param {DOMElement} mp mountPoint where to render game
   */
  static create(mp) {
    const game = new Game(mp);
    game.init();
    game.startGame();
    return game;
  }

  /**
   * @param {DOMElement} mp mountPoint where to render game
   */
  constructor(mp) {
    this._mp = mp;
    window.game = this;
  }

  getRandomCell() {
    const col = Math.ceil(Math.random() * this._stage.widthInCells - 1);
    const row = Math.ceil(Math.random() * this._stage.heightInCells - 1);
    return { col, row };
  }

  init() {
    this.createStage();
    this.setAppleCoords();
    this.renderStage();
    this.renderApple();
    this.renderSnake();
    this.addEventListeners();
  }

  setAppleCoords() {
    this._appleCoords = this.getRandomCell();
  }

  createStage() {
    this._stage = Stage.create(this._mp);
  }

  startGame() {
    this.intervalId = setInterval(() => {
      this.gameFrame();
    }, 300);
  }

  gameFrame() {
    requestAnimationFrame(() => {
      this.renderStage();
      this.renderApple();
      this.move();
    });
  }

  renderStage() {
    this._stage.render();
  }

  move() {
    this._snake.move();
    this._snake.render();
  }

  renderApple() {
    this._stage.renderApple(this._appleCoords);
  }

  stopGame() {
    clearInterval(this.intervalId);
    console.log('GAME OVER');
  }

  renderSnake() {
    const { canvas, cellSize } = this._stage;
    this._snake = Snake.create(canvas, cellSize, (col, row) =>
      this.onMove(col, row)
    );
  }

  onMove() {
    const { col, row } = this._snake.head;
    if (this.checkCollisions(col, row)) {
      this.stopGame();
    }
    if (this.checkApple(col, row)) {
      this._snake.grow();
      this.setAppleCoords();
    }
  }

  checkApple(col, row) {
    return this._stage.checkApple(col, row);
  }

  checkCollisions(col, row) {
    return (
      this.checkStageCollision(col, row) || this._snake.checkSelfCollision()
    );
  }

  checkStageCollision(col, row) {
    return (
      col >= this._stage.widthInCells ||
      row >= this._stage.heightInCells ||
      col < 0 ||
      row < 0
    );
  }

  setDirection(dir) {
    this._snake.setDirection(dir);
  }

  addEventListeners() {
    document.addEventListener('keydown', e => {
      switch (e.key) {
        case 's':
          this.setDirection(DIRECTIONS.BOTTOM);
          break;
        case 'w':
          this.setDirection(DIRECTIONS.TOP);
          break;
        case 'd':
          this.setDirection(DIRECTIONS.RIGHT);
          break;
        case 'a':
          this.setDirection(DIRECTIONS.LEFT);
          break;
      }
    });
  }
}
