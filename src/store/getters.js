const getters = {
  // 这个state表示当前文件同级的state.js
  appNameWithVersion: (state) => {
    return state.appName + 'v2.0'
    // 等价于
    // return `${state.appName}v2.0`
  }
}

export default getters
