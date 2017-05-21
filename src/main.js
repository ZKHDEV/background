import Vue from 'vue'
import router from './router'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'
import Mock from './mock/mock'
import store from './store/store'

import axios from './http'
// 解决IE下promise兼容性问题
import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}


Vue.use(ElementUI)

Vue.prototype.$http = axios
Mock.mockData()

// 页面标题命令
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value + ' - 后台管理系统';
  }
})


new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
