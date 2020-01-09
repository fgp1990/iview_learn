import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 告警提示控制，false表示是生产环境，使用生产模式，不产生console告警
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
