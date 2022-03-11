"use strict";

var _vue = require("vue");

var _axios = _interopRequireDefault(require("axios"));

var _vueAxios = _interopRequireDefault(require("vue-axios"));

var _vueLoadingOverlay = _interopRequireDefault(require("vue-loading-overlay"));

require("vue-loading-overlay/dist/vue-loading.css");

var _veeValidate = require("vee-validate");

var _i18n = require("@vee-validate/i18n");

var _zh_TW = _interopRequireDefault(require("@vee-validate/i18n/dist/locale/zh_TW.json"));

var _rules = _interopRequireDefault(require("@vee-validate/rules"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

require("./assets/tailwind.css");

var _timeFormat = require("./methods/timeFormat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _veeValidate.configure)({
  generateMessage: (0, _i18n.localize)({
    zh_TW: _zh_TW["default"]
  }),
  // 載入繁體中文語系
  validateOnInput: false // 當輸入任何內容直接進行驗證

});
(0, _i18n.setLocale)('zh_TW'); // 設定預設語系

Object.keys(_rules["default"]).forEach(function (rule) {
  (0, _veeValidate.defineRule)(rule, _rules["default"][rule]);
});
var app = (0, _vue.createApp)(_App["default"]);
app.config.globalProperties.$timeFormat = {
  formatTime: _timeFormat.formatTime
};
app.use(_router["default"]);
app.use(_vueAxios["default"], _axios["default"]);
app.component('VLoading', _vueLoadingOverlay["default"]);
app.component('VField', _veeValidate.Field);
app.component('VForm', _veeValidate.Form);
app.component('ErrorMessage', _veeValidate.ErrorMessage);
app.mount('#app');