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
  static create({ canvas, cellSize, onMove, dir }) {
    const snake = new Snake({ canvas, cellSize, onMove, dir });
    snake.init();
    snake.render();
    return snake;
  }

  constructor({
    canvas,
    cellSize,
    onMove,
    onSelfCollision,
    direction = DIRECTIONS.RIGHT
  }) {
    this._canvas = canvas;
    this._cellSize = cellSize;
    this._length = 2;
    this._direction = direction;
    this._collision = false;

    this.onMove = onMove;
    this.onSelfCollision = onSelfCollision;
  }

  get segments() {
    return this._segments;
  }

  init() {
    this._segments = [
      this.createSegment(7, 5, true),
      this.createSegment(6, 5),
      this.createSegment(5, 5)
    ];
  }

  checkSelfCollision() {
    let hasCollision = false;
    const [head] = this._segments;
    for (let i = 1; i < this._segments.length; i += 1) {
      if (
        head.col === this._segments[i].col &&
        head.row === this._segments[i].row
      ) {
        hasCollision = true;
        break;
      }
    }
    return hasCollision;
  }

  /**
   * @param {string} dir
   */
  setDirection(dir) {
    if (this.isNewDirectionValid(dir)) {
      this._direction = dir;
    }
  }

  grow() {
    const { col, row } = this.getNewHeadCoordinates();
    this._segments.push(this.createSegment(col, row));
  }

  /**
   * @param {boolean} collision
   *
   */
  setCollision(collision) {
    this._collision = collision;
  }

  /**
   * @return {Cell}
   */
  get head() {
    return this._segments[0];
  }

  render() {
    this._segments.forEach(segment => {
      segment.render();
    });
  }

  createSegment(col, row) {
    const { w, h } = this._cellSize;
    const segment = Cell.createWithColor({
      canvas: this._canvas,
      col,
      row,
      w,
      h,
      bgColor: 'aqua'
    });
    return segment;
  }

  move() {
    const { col, row } = this.getNewHeadCoordinates();
    this.moveHead(col, row);
  }

  moveHead(col, row) {
    this._segments.unshift(this.createSegment(col, row));
    this._segments.pop();
  }

  getNewHeadCoordinates() {
    let { col, row } = this.head;
    switch (this._direction) {
      case DIRECTIONS.TOP:
        row -= 1;
        break;
      case DIRECTIONS.LEFT:
        col -= 1;
        break;
      case DIRECTIONS.BOTTOM:
        row += 1;
        break;
      default:
        col += 1;
    }

    return { col, row };
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
