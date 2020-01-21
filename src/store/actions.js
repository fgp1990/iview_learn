import { getAppName } from '@/api/app'

const actions = {
  // { commit }这种写法是vuex的结构赋值，相当于下面这个写法
  // updateAppName (paramsObj) {
  //   const commit = paramsObj.commit
  // }
  // 可以理解为向全局同步当前修改
  // updateAppName ({ commit }) {
  //   getAppName().then(res => {
  //     // commit('SET_APP_NAME', res.info.appName)
  //     // 下面这种写法和上面是等价的，就是commit的第二个参数写法不一样
  //     const { info: { appName } } = res
  //     // const { code, info: { appName } } = res   完整的写法，这里因为code没有用上，必须要去掉
  //     commit('SET_APP_NAME', appName)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // 以下是vuex8的高级写法
  async updateAppName ({ commit }) {
    try {
      const { info: { appName } } = await getAppName()
      commit('SET_APP_NAME', appName)
    } catch (err) {
      console.log(err)
    }
  }
}
export default actions
