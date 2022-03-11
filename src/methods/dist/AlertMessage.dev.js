"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(title) {
  var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';
  var content = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  this.$swal.fire({
    title: title,
    text: content,
    icon: icon,
    confirmButtonText: '確定'
  });
}