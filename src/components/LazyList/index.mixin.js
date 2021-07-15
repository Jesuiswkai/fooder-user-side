export default {
  props: {
    value: {
      // 是否加载
      type: Boolean,
      default: false
    },
    list: {
      // 列表
      type: Array,
      default: () => {
        return [];
      }
    },
    finished: {
      // 是否加载完毕（没有更多）
      type: Boolean,
      default: false
    },
    proxy: {
      // 外部代理监听触底
      type: Boolean,
      default: false
    },
    hideLoadmore: {
      // 没有数据时自动隐藏loadmore组件
      type: Boolean,
      default: false
    }
  }
  /** 事件
   * load 列表触底，需要加载
   */
};
