// 如果是生产环境
export const baseURL = process.env.NODE_ENV === 'production'
  ? 'http://productions.com'
  : ''
