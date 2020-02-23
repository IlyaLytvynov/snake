import { Stage, GAME_MODES } from './stage.js';
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
    this.fps = 3;
    this.lastTime = Date.now();
  }

  get appleCoords() {
    return this.stage.apple;
  }

  init() {
    this.createStage();
  }

  createStage() {
    this.stage = Stage.create({
      root: this.mp,
      onWelcomeScreenClick: () => this.startGame()
    });
  }

  startGame() {
    this.stage.setMode(GAME_MODES.STARTED);
    this.renderSnake();
    this.addEventListeners();
    this.loop();
  }

  loop() {
    if (this.collision) {
      this.stopGame();
      return;
    }
    const fpsInterval = 1000 / this.fps;
    const currentTime = Date.now();
    const elapsedTime = currentTime - this.lastTime;
    this.requestedFrame = window.requestAnimationFrame(() => {
      if (elapsedTime > fpsInterval) {
        this.update();
        this.lastTime = currentTime - elapsedTime % fpsInterval;
      }
      this.loop();
    });
  }

  update() {
    this.checkApple();
    this.renderStage();
    this.move();
    this.checkCollisions();
  }

  renderStage() {
    this.stage.score = this.score;
    this.stage.render();
  }

  move() {
    this.snake.move();
    this.snake.render();
  }

  stopGame() {
    console.log(this.intervalId);
    window.cancelAnimationFrame(this.requestedFrame);
    console.log('GAME OVER');
  }

  renderSnake() {
    const { canvas, cellSize } = this.stage;
    this.snake = Snake.create({
      canvas,
      cellSize
    });
  }

  checkApple() {
    const { col, row } = this.snake.head;
    if (this.stage.isEat({ col, row })) {
      this.snake.grow();
      this.score += 1;
      this.stage.updateApple();
    }
  }

  checkCollisions() {
    const { col, row } = this.snake.head;
    this.collision =
      this.checkStageCollision(col, row) || this.snake.checkSelfCollision();
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
