"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = format;

function format(time) {
  var localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}