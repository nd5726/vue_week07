"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTime = formatTime;

function formatTime(time) {
  var localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}