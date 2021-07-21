import Api from '../source/Api'

export default {
  // 获取最近服务商
  getLatelyProviders: new Api({
    url: '/providers/providers/getLatelyProviders',
    method: 'post',
    public: true
  }),

  // 获取最近服务商
  providersList: new Api({
    url: '/providers/providers/providersList',
    method: 'post',
    public: true
  }),

  // 设置默认服务商
  setDefaultProviders: new Api({
    url: '/providers/providers/setDefaultProviders',
    method: 'get',
    public: true
  })
}
