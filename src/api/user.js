import axios from './index'

export const getUserInfo = ({ userId }) => {
  console.log('api/user: ', userId)
  return axios.request({
    url: '/coupon/getCustomerCouponNum',
    method: 'post',
    data: {
      // 如果属性名和变量名相同，可以这么写。否则，就是userId：userId
      userId
    }
  })
}
