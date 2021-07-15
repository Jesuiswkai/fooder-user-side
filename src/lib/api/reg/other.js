import Api from '../source/Api'

export default {
  // 获取消息列表
  getNoticeList: new Api({
    url: '/other/getNoticeList',
    method: 'get',
    public: true
  }),

  // 获取banner列表
  getBannerList: new Api({
    url: '/other/getBannerList',
    method: 'get',
    public: true
  }),

  // 获取banner详情
  getBannerInfo: new Api({
    url: '/other/getBannerInfo',
    method: 'get',
    public: true
  }),

  // 获取协议/关于/客户电话
  getAboutInfo: new Api({
    url: '/other/getAboutInfo',
    method: 'get',
    public: true
  }),

  // 获取版本信息
  getAppVersion: new Api({
    url: '/other/getAppVersion',
    method: 'get',
    public: true
  }),

  // 获取帮助中心
  getHelpCenterList: new Api({
    url: '/other/getHelpCenterList',
    method: 'get',
    public: true
  })
}
