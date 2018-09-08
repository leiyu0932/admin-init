import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import Home from '@/views/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]
})

router.beforeEach((to: any, from: any, next: any) => {
  iView.LoadingBar.start()
  document.title = to.meta.title || 'A页面'
  next()
})

router.afterEach((to: any, from: any, next: any) => {
  iView.LoadingBar.finish()
})

export default router
