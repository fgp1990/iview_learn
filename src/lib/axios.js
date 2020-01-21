import axios from 'axios'
import { baseURL } from '@/config'
class HttpRequest {
  // constructor是固定的必须要有的，如果没有，系统会自动建一个
  constructor (baseUrl = baseURL) {
    // 上一行的写法表示如果baseUrl存在，就用baseUrl，如果不存在就用默认——baseURL
    // this就是你new HttpRequest的时候的对象
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      // 全局设置的内容
      baseUrl: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  // 拦截器
  interceptors (instance, url) {
    instance.interceptors.request.use(config => {
      // 添加一个全局的loading...
      // Spin.show()。就是一个遮罩，不过需要安装ivew才能用
      if (!Object.keys(this.queue).length) {
        // Spin.show()
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截器
    instance.interceptors.response.use(res => {
      delete this.queue[url]
      // 这样就会只返回这两个字段值
      const { data, status } = res
      return { data, status }
    }, error => {
      delete this.queue[url]
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    // assign用来合并括号里面的两个对象，重复key以后面的为准
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
