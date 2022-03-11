"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mitt = _interopRequireDefault(require("mitt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var emitter = (0, _mitt["default"])();
var _default = emitter;
exports["default"] = _default;