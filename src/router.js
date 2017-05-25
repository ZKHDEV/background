import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'
import types from './store/mutation-types'

Vue.use(VueRouter)

const routes = [
{
  path: '/',
  meta: {
    auth: true
  },
  component: resolve => require(['./components/Layout/Admin.vue'], resolve),
  children: [
    {
      path: '',
      name: '/',
      component: resolve => require(['./components/Welcome.vue'], resolve)
    },
    {
      path: 'user',
      name: 'user',
      component: resolve => require(['./components/Table/Table.vue'], resolve)
    },
    {
      path: 'setting',
      name: 'setting',
      component: resolve => require(['./components/Setting.vue'], resolve)
    },
    {
      path: 'chart',
      name: 'chart',
      component: resolve => require(['./components/Chart/Chart.vue'], resolve)
    }
  ]
},
{
  path: '/login',
  name: 'login',
  component: resolve => require(['./components/Login.vue'], resolve)
}
]

if(window.localStorage.getItem('back_token')){
  store.commit(types.LOGIN, window.localStorage.getItem('back_token'))
}

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.auth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

export default router;