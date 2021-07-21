import Api from '../source/Api'

export default {
  login: new Api({
    url: '/user/WxLogin',
    method: 'post',
    public: true
  }),

  getPayInfo: new Api({
    url: '/order/orderPay',
    method: 'post',
    public: true
  }),

  // 获取用户优惠券列表
  getUserCouponList: new Api({
    url: '/user/getUserCouponList',
    method: 'post',
    public: true
  }),

  // 获取优惠券列表
  getCouponList: new Api({
    url: '/user/getCouponList',
    method: 'post',
    public: true
  }),

  // 领取优惠券
  saveCoupon: new Api({
    url: '/user/saveCoupon',
    method: 'post',
    public: true
  }),

  // 获取用户信息
  getInfo: new Api({
    url: '/user/getInfo',
    method: 'get',
    public: true
  })
}
