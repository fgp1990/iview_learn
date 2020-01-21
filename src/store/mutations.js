import vue from 'vue'

const mutations = {
  // state指代和它同级的state对象，params可以是单值，也可以是对象，如果是多个传入值，只能是对象
  SET_APP_NAME (state, params) {
    state.appName = params
  },
  SET_APP_VERSION (state) {
    // 第一个值是给谁设置值，第二个是设置的名字，第三个是设置的值
    vue.set(state, 'appVersion', 'v6.0')
  }
}

export default mutations
