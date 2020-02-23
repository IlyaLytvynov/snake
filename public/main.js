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

/***/ "./src/game.css":
/*!**********************!*\
  !*** ./src/game.css ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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
/* harmony import */ var _game_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.css */ "./src/game.css");
/* harmony import */ var _game_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_game_css__WEBPACK_IMPORTED_MODULE_2__);
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
      window.game = game;
      return game;
    }
    /**
     * @param {DOMElement} mp mountPoint where to render game
     */

  }]);

  function Game(mp) {
    _classCallCheck(this, Game);

    this.mp = mp;
    this.score = 0;
    this.fps = 3;
    this.lastTime = Date.now();
  }

  _createClass(Game, [{
    key: "init",
    value: function init() {
      this.createGameContainer();
      this.createStage();
    }
  }, {
    key: "createGameContainer",
    value: function createGameContainer() {
      this.container = document.createElement('div');
      this.container.classList.add('game-container');
      this.mp.append(this.container);
    }
  }, {
    key: "createStage",
    value: function createStage() {
      var _this = this;

      this.stage = _stage_js__WEBPACK_IMPORTED_MODULE_0__["Stage"].create({
        root: this.container,
        onWelcomeScreenClick: function onWelcomeScreenClick() {
          return _this.startGame();
        }
      });
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this.stage.setMode(_stage_js__WEBPACK_IMPORTED_MODULE_0__["GAME_MODES"].STARTED);
      this.renderSnake();
      this.addEventListeners();
      this.loop();
    }
  }, {
    key: "loop",
    value: function loop() {
      var _this2 = this;

      if (this.collision) {
        this.stopGame();
        return;
      }

      var fpsInterval = 1000 / this.fps;
      var currentTime = Date.now();
      var elapsedTime = currentTime - this.lastTime;
      this.requestedFrame = window.requestAnimationFrame(function () {
        if (elapsedTime > fpsInterval) {
          _this2.update();

          _this2.lastTime = currentTime - elapsedTime % fpsInterval;
        }

        _this2.loop();
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.checkApple();
      this.renderStage();
      this.move();
      this.checkCollisions();
    }
  }, {
    key: "renderStage",
    value: function renderStage() {
      this.stage.score = this.score;
      this.stage.render();
    }
  }, {
    key: "move",
    value: function move() {
      this.snake.move();
      this.snake.render();
    }
  }, {
    key: "stopGame",
    value: function stopGame() {
      console.log(this.intervalId);
      window.cancelAnimationFrame(this.requestedFrame);
      console.log('GAME OVER');
    }
  }, {
    key: "renderSnake",
    value: function renderSnake() {
      var _this$stage = this.stage,
          canvas = _this$stage.canvas,
          cellSize = _this$stage.cellSize;
      this.snake = _snake_js__WEBPACK_IMPORTED_MODULE_1__["Snake"].create({
        canvas: canvas,
        cellSize: cellSize
      });
    }
  }, {
    key: "checkApple",
    value: function checkApple() {
      var _this$snake$head = this.snake.head,
          col = _this$snake$head.col,
          row = _this$snake$head.row;

      if (this.stage.isEat({
        col: col,
        row: row
      })) {
        this.snake.grow();
        this.score += 1;
        this.stage.updateApple();
      }
    }
  }, {
    key: "checkCollisions",
    value: function checkCollisions() {
      var _this$snake$head2 = this.snake.head,
          col = _this$snake$head2.col,
          row = _this$snake$head2.row;
      this.collision = this.checkStageCollision(col, row) || this.snake.checkSelfCollision();
    }
  }, {
    key: "checkStageCollision",
    value: function checkStageCollision(col, row) {
      return col >= this.stage.widthInCells || row >= this.stage.heightInCells || col < 0 || row < 0;
    }
  }, {
    key: "setDirection",
    value: function setDirection(dir) {
      this.snake.setDirection(dir);
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
  }]);

  return Game;
}();

/***/ }),

/***/ "./src/gameField.js":
/*!**************************!*\
  !*** ./src/gameField.js ***!
  \**************************/
/*! exports provided: GameField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameField", function() { return GameField; });
/* harmony import */ var _cell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell.js */ "./src/cell.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * @typedef Params
 * @param {DOMElement} mp
 * @param {Number} width
 * @param {Number} height
 */

var GameField =
/*#__PURE__*/
function () {
  _createClass(GameField, null, [{
    key: "create",

    /**
     * @param {DOMElement} mp
     * @param {Number} width
     * @param {Number} height
     */
    value: function create(options) {
      var stage = new GameField(_objectSpread({}, options));
      stage.render();
      return stage;
    }
    /**
     * @param {DOMElement} mp
     * @param {Number} width
     * @param {Number} height
     */

  }]);

  function GameField(_ref) {
    var canvas = _ref.canvas,
        width = _ref.width,
        height = _ref.height;

    _classCallCheck(this, GameField);

    this.cellSize = Math.floor(width / 20);
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.heightInCells = Math.floor(this.height / this.cellSize);
    this.widthInCells = Math.floor(this.width / this.cellSize);
  }

  _createClass(GameField, [{
    key: "checkApple",
    value: function checkApple(_ref2) {
      var col = _ref2.col,
          row = _ref2.row;
      return this.apple.col === col && this.apple.row === row;
    }
    /**
     *
     * @param {Object} coords
     * @param {number} coords.col
     * @param {number} coords.row
     */

  }, {
    key: "renderApple",
    value: function renderApple(_ref3) {
      var col = _ref3.col,
          row = _ref3.row;
      this.apple = _cell_js__WEBPACK_IMPORTED_MODULE_0__["Cell"].createWithColor({
        canvas: this.canvas,
        col: col,
        row: row,
        w: this.cellSize,
        h: this.cellSize,
        bgColor: 'red'
      });
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
            canvas: this.canvas,
            col: col,
            row: row,
            w: this.cellSize,
            h: this.cellSize
          });
        }
      }
    }
  }]);

  return GameField;
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

/***/ "./src/score.js":
/*!**********************!*\
  !*** ./src/score.js ***!
  \**********************/
/*! exports provided: Score */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Score", function() { return Score; });
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text */ "./src/text.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Score =
/*#__PURE__*/
function (_Text) {
  _inherits(Score, _Text);

  _createClass(Score, null, [{
    key: "create",

    /**
     * @param {object} options
     * @param {HTMLCanvasElement} options.root
     */
    value: function create(options) {
      var score = new Score(options);
      score.render();
      return score;
    }
    /**
     * @param {object} options
     * @param {HTMLCanvasElement} options.root
     */

  }]);

  function Score(options) {
    var _this;

    _classCallCheck(this, Score);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Score).call(this, options));
    _this.textContent = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeScore"])(options.score);
    _this.textColor = 'magenta';
    _this.x = 10;
    return _this;
  }

  _createClass(Score, [{
    key: "setScore",
    value: function setScore(score) {
      this.textContent = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeScore"])(score);
    }
  }]);

  return Score;
}(_text__WEBPACK_IMPORTED_MODULE_0__["Text"]);

/***/ }),

/***/ "./src/screen.js":
/*!***********************!*\
  !*** ./src/screen.js ***!
  \***********************/
/*! exports provided: Screen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Screen", function() { return Screen; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Screen =
/*#__PURE__*/
function () {
  function Screen() {
    _classCallCheck(this, Screen);
  }

  _createClass(Screen, null, [{
    key: "getViewportSize",
    value: function getViewportSize() {
      var MAX_WIDTH = 1600;
      var MAX_HEIGHT = 1600;
      return {
        width: Math.min(window.innerWidth, MAX_WIDTH),
        height: Math.min(window.innerHeight, MAX_HEIGHT)
      };
    }
  }]);

  return Screen;
}();

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
    this._direction = direction;
    this.onMove = onMove;
    this.onSelfCollision = onSelfCollision;
  }

  _createClass(Snake, [{
    key: "init",
    value: function init() {
      this._segments = [this.createSegment(7, 5), this.createSegment(6, 5), this.createSegment(5, 5)];
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
     * @param {DIRECTIONS} dir
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

      this._segments.push(this.createSegment(col, row));
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
      var segment = _cell_js__WEBPACK_IMPORTED_MODULE_0__["Cell"].createWithColor({
        canvas: this._canvas,
        col: col,
        row: row,
        w: this._cellSize,
        h: this._cellSize,
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
/*! exports provided: GAME_MODES, Stage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAME_MODES", function() { return GAME_MODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stage", function() { return Stage; });
/* harmony import */ var _gameField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameField */ "./src/gameField.js");
/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./score */ "./src/score.js");
/* harmony import */ var _welcomeScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./welcomeScreen */ "./src/welcomeScreen.js");
/* harmony import */ var _screen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./screen */ "./src/screen.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





/**
 * @typedef Params
 * @param {DOMElement} root
 * @param {Number} width
 * @param {Number} height
 */

var GAME_MODES = {
  PENDING: 0,
  STARTED: 1
};
var Stage =
/*#__PURE__*/
function () {
  _createClass(Stage, null, [{
    key: "create",

    /**
     * @param {DOMElement} root
     */
    value: function create(options) {
      var _Screen$getViewportSi = _screen__WEBPACK_IMPORTED_MODULE_3__["Screen"].getViewportSize(),
          width = _Screen$getViewportSi.width,
          height = _Screen$getViewportSi.height;

      console.log(width, height);
      var stage = new Stage(_objectSpread({}, options, {
        width: width,
        height: height
      }));
      stage.init();
      return stage;
    }
    /**
     * @param {object} o
     * @param {DOMElement} o.root
     * @param {Number} o.width
     * @param {Number} o.height
     * @param {function} o.onWelcomeScreenClick
     */

  }]);

  function Stage(_ref) {
    var root = _ref.root,
        onWelcomeScreenClick = _ref.onWelcomeScreenClick,
        width = _ref.width,
        height = _ref.height;

    _classCallCheck(this, Stage);

    this.root = root;
    this.mode = GAME_MODES.PENDING;
    this.width = width;
    this.height = height;
    this.onWelcomeScreenClick = onWelcomeScreenClick;
  }

  _createClass(Stage, [{
    key: "setMode",
    value: function setMode(gameMode) {
      this.mode = gameMode;
      this.render();
    }
  }, {
    key: "getRandomCell",
    value: function getRandomCell() {
      var col = Math.ceil(Math.random() * this.widthInCells - 1);
      var row = Math.ceil(Math.random() * this.heightInCells - 1);
      return {
        col: col,
        row: row
      };
    }
  }, {
    key: "isEat",
    value: function isEat(_ref2) {
      var col = _ref2.col,
          row = _ref2.row;
      return this.field.checkApple({
        col: col,
        row: row
      });
    }
  }, {
    key: "updateApple",
    value: function updateApple() {
      this.appleCoords = this.getRandomCell();
    }
    /**
     *
     * @param {Object} coords
     * @param {number} coords.col
     * @param {number} coords.row
     */

  }, {
    key: "renderApple",
    value: function renderApple() {
      if (!this.appleCoords) {
        this.updateApple();
      }

      this.field.renderApple(this.appleCoords);
    }
    /**
     * @returns {DOMElement}
     */

  }, {
    key: "init",
    value: function init() {
      this.createCanvas();
      this.render();
    }
  }, {
    key: "renderWelcomeScreen",
    value: function renderWelcomeScreen() {
      this.welcomeScreen = _welcomeScreen__WEBPACK_IMPORTED_MODULE_2__["WelcomeScreen"].create({
        canvas: this.canvas,
        w: this.width,
        h: this.height,
        onClick: this.onWelcomeScreenClick
      });
    }
  }, {
    key: "createCanvas",
    value: function createCanvas() {
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvas.style.border = '1px solid red';
      this.root.appendChild(this.canvas);
    }
  }, {
    key: "render",
    value: function render() {
      switch (this.mode) {
        case GAME_MODES.STARTED:
          this.drawField();
          this.renderApple();
          this.drawScore();
          break;

        case GAME_MODES.PENDING:
          {
            this.renderWelcomeScreen();
            break;
          }
      }
    }
  }, {
    key: "drawScore",
    value: function drawScore() {
      this.score = _score__WEBPACK_IMPORTED_MODULE_1__["Score"].create({
        canvas: this.canvas,
        score: this.score
      });
    }
  }, {
    key: "drawField",
    value: function drawField() {
      this.field = _gameField__WEBPACK_IMPORTED_MODULE_0__["GameField"].create({
        canvas: this.canvas,
        width: this.width,
        height: this.height
      });
    }
  }, {
    key: "heightInCells",
    get: function get() {
      return this.field.heightInCells;
    }
  }, {
    key: "widthInCells",
    get: function get() {
      return this.field.widthInCells;
    }
  }, {
    key: "cellSize",
    get: function get() {
      return this.field.cellSize;
    }
  }]);

  return Stage;
}();

/***/ }),

/***/ "./src/text.js":
/*!*********************!*\
  !*** ./src/text.js ***!
  \*********************/
/*! exports provided: Text */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return Text; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Text =
/*#__PURE__*/
function () {
  _createClass(Text, null, [{
    key: "create",

    /**
     * @param {object} options
     * @param {HTMLCanvasElement} options.root
     */
    value: function create(options) {
      var score = new Text(options);
      score.render();
      return score;
    }
    /**
     * @param {object} options
     * @param {HTMLCanvasElement} options.root
     */

  }]);

  function Text(_ref) {
    var canvas = _ref.canvas,
        _ref$x = _ref.x,
        x = _ref$x === void 0 ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === void 0 ? 0 : _ref$y,
        w = _ref.w,
        _ref$h = _ref.h,
        h = _ref$h === void 0 ? 22 : _ref$h,
        textContent = _ref.textContent,
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? 'red' : _ref$color,
        _ref$textAlign = _ref.textAlign,
        textAlign = _ref$textAlign === void 0 ? 'left' : _ref$textAlign;

    _classCallCheck(this, Text);

    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.textColor = color;
    this.textContent = textContent;
    this.textAlign = textAlign;
  }

  _createClass(Text, [{
    key: "render",
    value: function render() {
      this.ctx.fillStyle = this.textColor;
      this.ctx.font = "".concat(this.h, "px Helvetica");
      this.ctx.textAlign = this.textAlign;
      this.ctx.fillText(this.textContent, this.x, this.y + this.h);
    }
  }, {
    key: "setText",
    value: function setText(textContent) {
      this.textContent = textContent;
    }
  }, {
    key: "setAlign",
    value: function setAlign(align) {
      this.textAlign = align;
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.textColor = color;
    }
  }]);

  return Text;
}();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getCellColor, normalizeScore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCellColor", function() { return getCellColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeScore", function() { return normalizeScore; });
var getCellColor = function getCellColor(col) {
  var color = 'white';

  if (col % 2 === 0) {
    color = 'white';
  }

  return color;
};
var normalizeScore = function normalizeScore(score) {
  if (score < 10) {
    return "00".concat(score);
  }

  if (score < 100) {
    return "0".concat(score);
  }

  return "".concat(score);
};

/***/ }),

/***/ "./src/welcomeScreen.js":
/*!******************************!*\
  !*** ./src/welcomeScreen.js ***!
  \******************************/
/*! exports provided: WelcomeScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomeScreen", function() { return WelcomeScreen; });
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text */ "./src/text.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var WelcomeScreen =
/*#__PURE__*/
function () {
  _createClass(WelcomeScreen, null, [{
    key: "create",
    value: function create(options) {
      var screen = new WelcomeScreen(options);
      screen.addEventListeners();
      screen.render();
      return screen;
    }
  }]);

  function WelcomeScreen(_ref) {
    var canvas = _ref.canvas,
        w = _ref.w,
        h = _ref.h,
        onClick = _ref.onClick;

    _classCallCheck(this, WelcomeScreen);

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = 0;
    this.y = 0;
    this.w = w;
    this.h = h;
    this.onClick = onClick;
    this.clickHandler = this.clickHandler.bind(this);
  }

  _createClass(WelcomeScreen, [{
    key: "render",
    value: function render() {
      this.drawBackground();
      this.renderText();
    }
  }, {
    key: "renderText",
    value: function renderText() {
      this.text = _text__WEBPACK_IMPORTED_MODULE_0__["Text"].create({
        canvas: this.canvas,
        x: this.w / 2,
        y: this.h / 2,
        textContent: 'Start',
        textAlign: 'center'
      });
    }
  }, {
    key: "drawBackground",
    value: function drawBackground() {
      this.ctx.fillStyle = 'rgba(0,0,0, .2)';
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }, {
    key: "clickHandler",
    value: function clickHandler() {
      this.onClick();
      this.canvas.removeEventListener('click', this.clickHandler);
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      this.canvas.addEventListener('click', this.clickHandler);
    }
  }]);

  return WelcomeScreen;
}();

/***/ })

/******/ });
//# sourceMappingURL=main.js.map