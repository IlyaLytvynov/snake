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
    this.appleCoords = { col: 5, row: 5 };
  }

  getRandomCell() {
    const col = Math.ceil(Math.random() * this._stage.widthInCells);
    const row = Math.ceil(Math.random() * this._stage.heightInCells);
    return { col, row };
  }

  init() {
    this.initStage();
    this.initSnake();
    this.initApple();
    this.addEventListeners();
  }

  initApple() {
    this._appleCoords = this.getRandomCell();
    this._stage.renderApple(this._appleCoords);
  }

  initStage() {
    this._stage = Stage.create(this._mp);
    this._stage.render();
  }

  startGame() {
    this.intervalId = setInterval(() => {
      this._snake.move();
    }, 800);
  }

  stopGame() {
    clearInterval(this.intervalId);
    this._snake.setCollision(true);
    console.log('GAME OVER');
  }

  initSnake() {
    const { canvas, cellSize } = this._stage;
    this._snake = Snake.create(canvas, cellSize, (col, row) =>
      this.onMove(col, row)
    );
  }

  onMove(col, row) {
    if (this.checkCollisions(col, row)) {
      this.stopGame();
    }
  }

  checkCollisions(col, row) {
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
