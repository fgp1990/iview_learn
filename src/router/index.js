import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'

Vue.use(VueRouter)

const router = new VueRouter({
  // 这里用routes也可以，等价的
  routes: routes
})

export default router
