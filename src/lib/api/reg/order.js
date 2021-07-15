import Api from '../source/Api'

export default {
  // 获取openId
  getOpenId: new Api({
    url: '/order/getOpenId',
    method: 'post',
    public: true
  }),

  // 立即下单
  orderNow: new Api({
    url: '/order/orderNow',
    method: 'post',
    public: true
  }),

  // 立即支付
  orderPay: new Api({
    url: '/order/orderPay',
    method: 'post',
    public: true
  }),

  // 取消订单
  orderCancel: new Api({
    url: '/order/orderCancel',
    method: 'post',
    public: true
  }),

  // 我的订单列表
  myOrderList: new Api({
    url: '/order/user/list',
    method: 'post',
    public: true
  }),

  // 订单详情
  myOrderList: new Api({
    url: '/order/orderDetail',
    method: 'get',
    public: true
  })
}
