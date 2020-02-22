import { Stage } from './stage.js';
import { Snake, DIRECTIONS } from './snake.js';

export class Game {
  /**
   * @param {DOMElement} mp mountPoint where to render game
   */
  static create(mp) {
    const game = new Game(mp);
    game.init();
    window.game = game;
    return game;
  }

  /**
   * @param {DOMElement} mp mountPoint where to render game
   */
  constructor(mp) {
    this.mp = mp;
    this.score = 0;
    this.speed = 600;
    window.game = this;
  }

  getRandomCell() {
    const col = Math.ceil(Math.random() * this.stage.widthInCells - 1);
    const row = Math.ceil(Math.random() * this.stage.heightInCells - 1);
    return { col, row };
  }

  init() {
    this.createStage();
    this.setAppleCoords();
    this.renderApple();
    this.renderSnake();
    this.addEventListeners();
  }

  setAppleCoords() {
    this.appleCoords = this.getRandomCell();
  }

  createStage() {
    this.stage = Stage.create(this.mp);
  }

  startGame() {
    this.requestFrame();
  }

  requestFrame() {
    this.intervalId = setInterval(() => {
      requestAnimationFrame(() => {
        this.update();
      });
    }, 300);
  }

  update() {
    this.renderStage();
    this.renderApple();
    this.move();
  }

  renderStage() {
    this.stage.render();
  }

  move() {
    this.snake.move();
    this.snake.render();
  }

  renderApple() {
    this.stage.renderApple(this.appleCoords);
  }

  stopGame() {
    console.log(this.intervalId);
    window.clearInterval(this.intervalId);
    console.log('GAME OVER');
  }

  renderSnake() {
    const { canvas, cellSize } = this.stage;
    this.snake = Snake.create({
      canvas,
      cellSize,
      onMove: (col, row) => this.onMove(col, row)
    });
  }

  onMove() {
    const { col, row } = this.snake.head;
    if (this.checkCollisions(col, row)) {
      this.stopGame();
    }
    if (this.checkApple({ col, row })) {
      this.snake.grow();
      this.setAppleCoords();
    }
  }

  checkApple({ col, row }) {
    return this.stage.checkApple({ col, row });
  }

  checkCollisions(col, row) {
    return (
      this.checkStageCollision(col, row) || this.snake.checkSelfCollision()
    );
  }

  checkStageCollision(col, row) {
    return (
      col >= this.stage.widthInCells ||
      row >= this.stage.heightInCells ||
      col < 0 ||
      row < 0
    );
  }

  setDirection(dir) {
    this.snake.setDirection(dir);
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
