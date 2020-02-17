/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cell.js":
/*!*********************!*\
  !*** ./src/cell.js ***!
  \*********************/
/*! exports provided: Cell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return Cell; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cell =
/*#__PURE__*/
function () {
  _createClass(Cell, null, [{
    key: "createWithColor",
    value: function createWithColor(_ref) {
      var canvas = _ref.canvas,
          col = _ref.col,
          row = _ref.row,
          w = _ref.w,
          h = _ref.h,
          bgColor = _ref.bgColor;
      var cell = new Cell({
        canvas: canvas,
        col: col,
        row: row,
        w: w,
        h: h
      });
      cell.color = bgColor;
      cell.render();
      return cell;
    }
  }, {
    key: "create",
    value: function create(_ref2) {
      var canvas = _ref2.canvas,
          col = _ref2.col,
          row = _ref2.row,
          w = _ref2.w,
          h = _ref2.h;
      var cell = new Cell({
        canvas: canvas,
        col: col,
        row: row,
        w: w,
        h: h
      });
      cell.render();
      return cell;
    }
  }]);

  function Cell(_ref3) {
    var canvas = _ref3.canvas,
        col = _ref3.col,
        row = _ref3.row,
        w = _ref3.w,
        h = _ref3.h;

    _classCallCheck(this, Cell);

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


  _createClass(Cell, [{
    key: "render",
    value: function render() {
      this.drawRect();
      this.ctx.strokeStyle = 'grey';
      this.ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.setDefaultColor();
      this.render();
    }
  }, {
    key: "drawRect",
    value: function drawRect() {
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }, {
    key: "setDefaultColor",
    value: function setDefaultColor() {
      this.ctx.fillStyle = this.col % 2 === 0 ? 'white' : 'white';
    }
  }, {
    key: "color",
    set: function set(color) {
      this.ctx.fillStyle = color;
    },
    get: function get() {
      return this.ctx.fillStyle;
    }
  }]);

  return Cell;
}();

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony import */ var _stage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stage.js */ "./src/stage.js");
/* harmony import */ var _snake_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./snake.js */ "./src/snake.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Game =
/*#__PURE__*/
function () {
  _createClass(Game, null, [{
    key: "create",

    /**
     * @param {DOMElement} mp mountPoint where to render game
     */
    value: function create(mp) {
      var game = new Game(mp);
      game.init();
      game.startGame();
      return game;
    }
    /**
     * @param {DOMElement} mp mountPoint where to render game
     */

  }]);

  function Game(mp) {
    _classCallCheck(this, Game);

    this._mp = mp;
    this._score = 0;
    this._speed = 600;
    window.game = this;
  }

  _createClass(Game, [{
    key: "getRandomCell",
    value: function getRandomCell() {
      var col = Math.ceil(Math.random() * this._stage.widthInCells - 1);
      var row = Math.ceil(Math.random() * this._stage.heightInCells - 1);
      return {
        col: col,
        row: row
      };
    }
  }, {
    key: "init",
    value: function init() {
      this.createStage();
      this.setAppleCoords();
      this.renderStage();
      this.renderApple();
      this.renderSnake();
      this.addEventListeners();
    }
  }, {
    key: "setAppleCoords",
    value: function setAppleCoords() {
      this._appleCoords = this.getRandomCell();
    }
  }, {
    key: "createStage",
    value: function createStage() {
      this._stage = _stage_js__WEBPACK_IMPORTED_MODULE_0__["Stage"].create(this._mp);
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this.i = 0;
      this.requestFrame();
    }
  }, {
    key: "requestFrame",
    value: function requestFrame() {
      var _this = this;

      this.intervalId = requestAnimationFrame(function () {
        console.group(_this.i);

        if (_this.i < 10) {
          // This.gameFrame();
          _this.requestFrame();
        } else {
          cancelAnimationFrame(_this.intervalId);
        }

        _this.i += 1;
      });
    }
  }, {
    key: "gameFrame",
    value: function gameFrame() {
      this.renderStage();
      this.renderApple();
      this.move();
      this.gameFrame();
    }
  }, {
    key: "renderStage",
    value: function renderStage() {
      this._stage.render();
    }
  }, {
    key: "move",
    value: function move() {
      this._snake.move();

      this._snake.render();
    }
  }, {
    key: "renderApple",
    value: function renderApple() {
      this._stage.renderApple(this._appleCoords);
    }
  }, {
    key: "stopGame",
    value: function stopGame() {
      console.log(this.intervalId);
      window.cancelAnimationFrame(this.intervalId);
      console.log('GAME OVER');
    }
  }, {
    key: "renderSnake",
    value: function renderSnake() {
      var _this2 = this;

      var _this$_stage = this._stage,
          canvas = _this$_stage.canvas,
          cellSize = _this$_stage.cellSize;
      this._snake = _snake_js__WEBPACK_IMPORTED_MODULE_1__["Snake"].create({
        canvas: canvas,
        cellSize: cellSize,
        onMove: function onMove(col, row) {
          return _this2.onMove(col, row);
        }
      });
    }
  }, {
    key: "onMove",
    value: function onMove() {
      var _this$_snake$head = this._snake.head,
          col = _this$_snake$head.col,
          row = _this$_snake$head.row;

      if (this.checkCollisions(col, row)) {
        this.stopGame();
      }

      if (this.checkApple(col, row)) {
        this._snake.grow();

        this.setAppleCoords();
      }
    }
  }, {
    key: "checkApple",
    value: function checkApple(col, row) {
      return this._stage.checkApple(col, row);
    }
  }, {
    key: "checkCollisions",
    value: function checkCollisions(col, row) {
      return this.checkStageCollision(col, row) || this._snake.checkSelfCollision();
    }
  }, {
    key: "checkStageCollision",
    value: function checkStageCollision(col, row) {
      return col >= this._stage.widthInCells || row >= this._stage.heightInCells || col < 0 || row < 0;
    }
  }, {
    key: "setDirection",
    value: function setDirection(dir) {
      this._snake.setDirection(dir);
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this3 = this;

      document.addEventListener('keydown', function (e) {
        switch (e.key) {
          case 's':
            _this3.setDirection(_snake_js__WEBPACK_IMPORTED_MODULE_1__["DIRECTIONS"].BOTTOM);

            break;

          case 'w':
            _this3.setDirection(_snake_js__WEBPACK_IMPORTED_MODULE_1__["DIRECTIONS"].TOP);

            break;

          case 'd':
            _this3.setDirection(_snake_js__WEBPACK_IMPORTED_MODULE_1__["DIRECTIONS"].RIGHT);

            break;

          case 'a':
            _this3.setDirection(_snake_js__WEBPACK_IMPORTED_MODULE_1__["DIRECTIONS"].LEFT);

            break;
        }
      });
    }
  }, {
    key: "gameSpeed",
    get: function get() {
      return this._speed;
    }
  }]);

  return Game;
}();

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/game.js");

var body = document.querySelector('body');
_game_js__WEBPACK_IMPORTED_MODULE_0__["Game"].create(body);

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/*! exports provided: DIRECTIONS, Snake */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIRECTIONS", function() { return DIRECTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Snake", function() { return Snake; });
/* harmony import */ var _cell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell.js */ "./src/cell.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * Directions enum
 * @readonly
 * @enum {number}
 */

var DIRECTIONS = {
  RIGHT: 0,
  LEFT: 1,
  TOP: 2,
  BOTTOM: 3
};
var Snake =
/*#__PURE__*/
function () {
  _createClass(Snake, null, [{
    key: "create",
    value: function create(_ref) {
      var canvas = _ref.canvas,
          cellSize = _ref.cellSize,
          onMove = _ref.onMove,
          dir = _ref.dir;
      var snake = new Snake({
        canvas: canvas,
        cellSize: cellSize,
        onMove: onMove,
        dir: dir
      });
      snake.init();
      snake.render();
      return snake;
    }
  }]);

  function Snake(_ref2) {
    var canvas = _ref2.canvas,
        cellSize = _ref2.cellSize,
        onMove = _ref2.onMove,
        onSelfCollision = _ref2.onSelfCollision,
        _ref2$direction = _ref2.direction,
        direction = _ref2$direction === void 0 ? DIRECTIONS.RIGHT : _ref2$direction;

    _classCallCheck(this, Snake);

    this._canvas = canvas;
    this._cellSize = cellSize;
    this._length = 2;
    this._direction = direction;
    this._collision = false;
    this.onMove = onMove;
    this.onSelfCollision = onSelfCollision;
  }

  _createClass(Snake, [{
    key: "init",
    value: function init() {
      this._segments = [this.createSegment(7, 5, true), this.createSegment(6, 5), this.createSegment(5, 5)];
    }
  }, {
    key: "checkSelfCollision",
    value: function checkSelfCollision() {
      var hasCollision = false;

      var _this$_segments = _slicedToArray(this._segments, 1),
          head = _this$_segments[0];

      for (var i = 1; i < this._segments.length; i += 1) {
        if (head.col === this._segments[i].col && head.row === this._segments[i].row) {
          hasCollision = true;
          break;
        }
      }

      return hasCollision;
    }
    /**
     * @param {string} dir
     */

  }, {
    key: "setDirection",
    value: function setDirection(dir) {
      if (this.isNewDirectionValid(dir)) {
        this._direction = dir;
      }
    }
  }, {
    key: "grow",
    value: function grow() {
      var _this$getNewHeadCoord = this.getNewHeadCoordinates(),
          col = _this$getNewHeadCoord.col,
          row = _this$getNewHeadCoord.row;

      this._segments.unshift(this.createSegment(col, row));
    }
    /**
     * @param {boolean} collision
     *
     */

  }, {
    key: "setCollision",
    value: function setCollision(collision) {
      this._collision = collision;
    }
    /**
     * @return {Cell}
     */

  }, {
    key: "render",
    value: function render() {
      this._segments.forEach(function (segment) {
        segment.render();
      });
    }
  }, {
    key: "createSegment",
    value: function createSegment(col, row) {
      var _this$_cellSize = this._cellSize,
          w = _this$_cellSize.w,
          h = _this$_cellSize.h;
      var segment = _cell_js__WEBPACK_IMPORTED_MODULE_0__["Cell"].createWithColor({
        canvas: this._canvas,
        col: col,
        row: row,
        w: w,
        h: h,
        bgColor: 'aqua'
      });
      return segment;
    }
  }, {
    key: "move",
    value: function move() {
      var _this$getNewHeadCoord2 = this.getNewHeadCoordinates(),
          col = _this$getNewHeadCoord2.col,
          row = _this$getNewHeadCoord2.row;

      this.moveHead(col, row);
      this.onMove();
    }
  }, {
    key: "moveHead",
    value: function moveHead(col, row) {
      this._segments.unshift(this.createSegment(col, row));

      this._segments.pop();
    }
  }, {
    key: "getNewHeadCoordinates",
    value: function getNewHeadCoordinates() {
      var _this$head = this.head,
          col = _this$head.col,
          row = _this$head.row;

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

      return {
        col: col,
        row: row
      };
    }
    /**
     * @param {number} newDir
     * @return {boolean}
     */

  }, {
    key: "isNewDirectionValid",
    value: function isNewDirectionValid(newDir) {
      if ((this._direction === DIRECTIONS.RIGHT || this._direction === DIRECTIONS.LEFT) && (newDir === DIRECTIONS.LEFT || newDir === DIRECTIONS.RIGHT)) {
        return false;
      }

      if ((this._direction === DIRECTIONS.TOP || this._direction === DIRECTIONS.BOTTOM) && (newDir === DIRECTIONS.TOP || newDir === DIRECTIONS.BOTTOM)) {
        return false;
      }

      return true;
    }
  }, {
    key: "segments",
    get: function get() {
      return this._segments;
    }
  }, {
    key: "head",
    get: function get() {
      return this._segments[0];
    }
  }]);

  return Snake;
}();

/***/ }),

/***/ "./src/stage.js":
/*!**********************!*\
  !*** ./src/stage.js ***!
  \**********************/
/*! exports provided: Stage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stage", function() { return Stage; });
/* harmony import */ var _cell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell.js */ "./src/cell.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * @typedef Params
 * @param {DOMElement} mp
 * @param {Number} width
 * @param {Number} height
 */

var Stage =
/*#__PURE__*/
function () {
  _createClass(Stage, null, [{
    key: "create",

    /**
     * @param {DOMElement} mp
     * @param {Number} width
     * @param {Number} height
     */
    value: function create(mp) {
      var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 640;
      var h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 640;
      var stage = new Stage(mp, w, h);
      stage.init();
      return stage;
    }
    /**
     * @param {DOMElement} mp
     * @param {Number} width
     * @param {Number} height
     */

  }]);

  function Stage(mp, width, height) {
    _classCallCheck(this, Stage);

    this._cellW = 16;
    this._cellH = 16;
    this._mp = mp;
    this._width = width;
    this._height = height;
  }

  _createClass(Stage, [{
    key: "checkApple",
    value: function checkApple(col, row) {
      return this._apple.col === col && this._apple.row === row;
    }
    /**
     *
     * @param {Object} coords
     * @param {number} coords.col
     * @param {number} coords.row
     */

  }, {
    key: "renderApple",
    value: function renderApple(_ref) {
      var col = _ref.col,
          row = _ref.row;
      this._apple = _cell_js__WEBPACK_IMPORTED_MODULE_0__["Cell"].createWithColor({
        canvas: this._canvas,
        col: col,
        row: row,
        w: this._cellW,
        h: this._cellH,
        bgColor: 'red'
      });
    }
    /**
     * @returns {DOMElement}
     */

  }, {
    key: "init",
    value: function init() {
      this._canvas = document.createElement('canvas');
      this._canvas.width = this._width;
      this._canvas.height = this._height;
      this._canvas.style.border = '1px solid red';

      this._mp.appendChild(this._canvas);

      return this._canvas;
    }
  }, {
    key: "render",
    value: function render() {
      this.drawField();
    }
  }, {
    key: "drawField",
    value: function drawField() {
      for (var row = 0; row < this.heightInCells; row += 1) {
        for (var col = 0; col < this.widthInCells; col += 1) {
          _cell_js__WEBPACK_IMPORTED_MODULE_0__["Cell"].create({
            canvas: this._canvas,
            col: col,
            row: row,
            w: this._cellW,
            h: this._cellH
          });
        }
      }
    }
  }, {
    key: "canvas",
    get: function get() {
      return this._canvas;
    }
  }, {
    key: "heightInCells",
    get: function get() {
      return this._height / this._cellH;
    }
  }, {
    key: "widthInCells",
    get: function get() {
      return this._width / this._cellW;
    }
  }, {
    key: "cellSize",
    get: function get() {
      return {
        w: this._cellW,
        h: this._cellH
      };
    }
  }, {
    key: "apple",
    get: function get() {
      return this._apple;
    }
  }]);

  return Stage;
}();

/***/ })

/******/ });
//# sourceMappingURL=main.js.map