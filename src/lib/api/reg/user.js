import Api from '../source/Api'

export default {
  login: new Api({
    url: 'login',
    method: 'post',
    public: true
  }),

  getPayInfo: new Api({
    url: '/order/orderPay',
    method: 'post',
    public: true
  })
}
