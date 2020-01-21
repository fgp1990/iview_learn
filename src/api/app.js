// 这是一个简单的模拟接口，可以用来mock数据。更高级的方法在mock里面
export const getAppName = () => {
  return new Promise((resolve, reject) => {
    const err = null
    setTimeout(() => {
      if (!err) resolve({ code: 200, info: { appName: 'newAppName' } })
    })
  })
}
