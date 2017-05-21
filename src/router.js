import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'
import types from './store/mutation-types'

Vue.use(VueRouter)

const routes = [
{
  path: '/',
  name: '/',
  meta: {
    auth: true
  },
  component: resolve => require(['./components/Admin.vue'], resolve),
  children: [
    {
      path: '',
      component: resolve => require(['./components/Table.vue'], resolve)
    },
    {
      path: 'user',
      name: 'user',
      component: resolve => require(['./components/Table.vue'], resolve)
    }
  ]
},
// {
//   path: '/',
//   name: '/',
//   meta: {
//     auth: true
//   },
//   component: resolve => require(['./components/Table.vue'], resolve)
// },
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