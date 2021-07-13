export default {
  props: {
    showNavbar: {
      // 显示导航栏
      type: Boolean,
      default: false
    },
    title: {
      // 导航栏标题
      type: String,
      default: ''
    },
    bgColor: {
      // 导航栏背景色
      type: String,
      default: 'white'
    },
    immersiveNav: {
      // 沉浸式导航栏
      type: Boolean,
      default: false
    },
    isTabPage: {
      // 是否Tab页面
      type: Boolean,
      default: false
    },
    loading: {
      // 页面加载状态
      type: Boolean,
      default: false
    },
    current: {
      type: [Number, String],
      default: 0
    }
  }
  /** 事件
   * scrolltolower 滚动触底
   * scroll 页面滚动事件
   */
}
