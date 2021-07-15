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
  })
}
