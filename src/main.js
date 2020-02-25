import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/font/iconfont.css'
import axios from 'axios'
import md5 from 'js-md5'
import qs from 'qs'

Vue.prototype.$qs = qs

/* 配置请求根路径 */
axios.defaults.baseURL = '/api'
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  /* 最后必须return config */
  return config
})
Vue.prototype.$http = axios
Vue.prototype.$md5 = md5

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
