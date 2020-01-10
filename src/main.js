import Vue from 'vue'
import App from './App.vue'
import router from './router' /** 这是路由模块 */
import store from './store' /** 这是状态管理模块 */
import Bus from './lib/bus' /** 这是通信模块 */

// 告警提示控制，false表示是生产环境，使用生产模式，不产生console告警
Vue.config.productionTip = false

// 在main.js里使用Vue.prototype声明的变量，实际上是为Vue对象添加了一个原型属性，而不是一个全局变量。
// 但是如果这个原型属性的值是引用类型的，我们就可以借此实现全局变量
Vue.prototype.$bus = Bus

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
