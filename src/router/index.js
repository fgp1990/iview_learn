import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
// 通过export default导出，不用加大括号
// 这里因为util里面export后面没有default，需要加{}
// 再者，一个文件里面，只能有一个export default
import { setTitle } from '@/lib/util'

Vue.use(VueRouter)

const router = new VueRouter({
  // 这里用routes也可以，等价的
  routes: routes,
  // mode有两种模式：mode和history
  // 两者明面上的区别就是#。hash模式请求url里面必带"#"，history不带。
  // 更深层次的区别在于：
  // hash模式下，向系统端发送的所有请求都截止到"#"号之前；而history会将整个url传到后端。
  // "#"号之后的内容，仅仅在前端逻辑中处理，不会传到系统端
  // 实际线上使用，还是用history比较好。为了避免出现404，此时就需要在router的最后写一个万能匹配
  mode: 'history'
})

const HAS_LOGINED = true

// 全局前置路由守卫
// to表示即将跳转到的路由对象；from表示即将离开的路由对象；next是一个函数，如果确定要做跳转，就要用到next
// 这里的逻辑就是：
// 如果用户已登录(HAS_LOGINED为true)，访问哪里显示哪里，如果访问login页，就自动跳转home页
// 如果没有登录，全部跳转到login页
router.beforeEach((to, from, next) => {
  // 如果to.meta是真，就执行后面的
  // to.meta && setTitle(to.meta.title)
  // 上一行等价写法
  if (to.meta) {
    setTitle(to.meta.title)
  }
  if (to.name !== 'login') {
    if (HAS_LOGINED) next()
    // 和实例的push一样，可以传多种形式
    else next({ name: 'login' })
  } else {
    if (HAS_LOGINED) next({ name: 'home' })
    else next()
  }
})

// 在导航被确认之前，所有导航钩子都被确认
// 在所有组件内守卫
// 在异步路由组件被解析之后
// 这个的入参和前置守卫一样
// router.beforeResolve()

// 后置路由钩子
router.afterEach((to, from) => {
  // 没有详细讲。就说了个能取消登录状态
})

/**
 * 1、导航被触发
 * 2、在失活的组件（即将离开的组件）里调用离开守卫 beforeRouteLeave
 * 3、调用全局的前置守卫 beforeEach
 * 4、在重用的组件里调用 beforeRouteUpdate。如果要跳转的组件是新的，不是复用的就会调用beforeRouteEnter
 * 5、调用路由独享的守卫 beforeEnter
 * 6、解析异步路由组件
 * 7、在被激活的组件（即将进入的页面组件）里调用 beforeRouteEnter
 * 8、调用全局的解析守卫 beforeResolve
 * 9、导航被确认
 * 10、调用全局的后置守卫 afterEach
 * 11、出发DOM渲染更新
 * 12、用创建好的实例调用beforeRouteEnter守卫里传给next的回调函数
 */

export default router
