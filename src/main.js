import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import Mock from './mock/mock'

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

import Table from './components/Table.vue'

const routes = [{
  path: '/',
  component: Table
},
{
  path: '/table',
  component: Table
}]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})