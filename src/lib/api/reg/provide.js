import Api from '../source/Api'

export default {
  // 获取最近服务商
  getLatelyProviders: new Api({
    url: '/providers/providers/getLatelyProviders',
    method: 'post',
    public: true
  })
}
