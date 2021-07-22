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
  }),

  // 保存收货地址
  saveUserAddress: new Api({
    url: '/userAddress/saveUserAddress',
    method: 'post',
    public: true
  }),

  // 修改收货地址
  updateUserAddress: new Api({
    url: '/userAddress/updateUserAddress',
    method: 'post',
    public: true
  }),

  // 删除地址
  deleteUserAddress: new Api({
    url: '/userAddress/deleteUserAddress',
    method: 'post',
    public: true
  }),

  // 获取用户地址列表
  getUserAddressList: new Api({
    url: '/userAddress/getList',
    method: 'post',
    public: true
  }),

  // 获取用户地址详情
  getAddressInfo: new Api({
    url: '/userAddress/getAddressInfo',
    method: 'get',
    public: true
  }),

  // 获取默认地址
  getDefaultAddress: new Api({
    url: '/userAddress/getDefaultAddress',
    method: 'get',
    public: true
  })
}
