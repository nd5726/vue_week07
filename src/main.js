import { createApp } from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import AllRules from '@vee-validate/rules'

import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

import { formatTime } from './methods/timeFormat'

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: false// 當輸入任何內容直接進行驗證
})
setLocale('zh_TW') // 設定預設語系
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

const app = createApp(App)

app.config.globalProperties.$timeFormat = {
  formatTime
}

app.use(router)
app.use(VueAxios, axios)
app.component('VLoading', Loading)
app.component('VField', Field)
app.component('VForm', Form)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
