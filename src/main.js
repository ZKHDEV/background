import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'
import Mock from './mock/mock'

import axios from 'axios'
// 解决IE下promise兼容性问题
import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}

Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.prototype.$http = axios
Mock.mockData()

// 页面标题命令
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value + ' - 后台管理系统';
  }
})

const routes = [{
  path: '/',
  component: resolve => require(['./components/Table.vue'], resolve)
},
{
  path: '/table',
  component: resolve => require(['./components/Table.vue'], resolve)
}]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
