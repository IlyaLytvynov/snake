import { Cell } from './cell.js';
/**
 * Directions enum
 * @readonly
 * @enum {number}
 */
export const DIRECTIONS = {
  RIGHT: 0,
  LEFT: 1,
  TOP: 2,
  BOTTOM: 3
};

export class Snake {
  static create(canvas, cellSize, onMove, onSelfCollision, dir) {
    const snake = new Snake(canvas, cellSize, onMove, onSelfCollision, dir);
    snake.render();
    return snake;
  }
  constructor(
    canvas,
    cellSize,
    onMove,
    onSelfCollision,
    direction = DIRECTIONS.RIGHT
  ) {
    this._canvas = canvas;
    this._cellSize = cellSize;
    this._length = 2;
    this._direction = direction;
    this._segments = [];
    this._collision = false;

    this.onMove = onMove;
    this.onSelfCollision = onSelfCollision;
  }
  /**
   * @param {string} dir
   */
  setDirection(dir) {
    if (this.isNewDirectionValid(dir)) {
      this._direction = dir;
    }
  }

  /**
   * @param {boolean} collision
   * */
  setCollision(collision) {
    this._collision = collision;
  }

  /**
   * @return {Cell}
   */
  get _head() {
    return this._segments[this._segments.length - 1];
  }
  /**
   * @return {Cell}
   */
  get _tail() {
    return this._segments[0];
  }

  render() {
    for (let i = 0; i < this._length; i++) {
      this._segments.push(this.renderSegment(i, 0));
    }
  }

  renderSegment(col, row) {
    const { w, h } = this._cellSize;
    const segment = Cell.createWithColor(this._canvas, col, row, w, h, 'aqua');
    segment.render();
    return segment;
  }

  move() {
    this._tail.clear();
    this._segments.shift();
    let col;
    let row;
    switch (this._direction) {
      case DIRECTIONS.TOP:
        col = this._head.col;
        row = this._head.row - 1;
        break;
      case DIRECTIONS.LEFT:
        col = this._head.col - 1;
        row = this._head.row;
        break;
      case DIRECTIONS.BOTTOM:
        col = this._head.col;
        row = this._head.row + 1;
        break;
      case DIRECTIONS.RIGHT:
      default:
        col = this._head.col + 1;
        row = this._head.row;
    }
    this.onMove(col, row);
    if (!this._collision) {
      this._segments.push(this.renderSegment(col, row));
    }
  }

  /**
   * @param {number} newDir
   * @return {boolean}
   */
  isNewDirectionValid(newDir) {
    if (
      (this._direction === DIRECTIONS.RIGHT ||
        this._direction === DIRECTIONS.LEFT) &&
      (newDir === DIRECTIONS.LEFT || newDir === DIRECTIONS.RIGHT)
    ) {
      return false;
    }
    if (
      (this._direction === DIRECTIONS.TOP ||
        this._direction === DIRECTIONS.BOTTOM) &&
      (newDir === DIRECTIONS.TOP || newDir === DIRECTIONS.BOTTOM)
    ) {
      return false;
    }

    return true;
  }
}
