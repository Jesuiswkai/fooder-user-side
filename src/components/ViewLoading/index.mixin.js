export default {
  props: {
    value: {
      // 是否加载
      type: Boolean,
      default: false
    },
    size: {
      // 加载图标大小
      type: String,
      default: '34'
    },
    bgColor: {
      // 背景颜色
      type: String,
      default: 'rgba(255, 255, 255, 0)'
    },
    borderRadius: {
      // 边框圆角
      type: String,
      default: '0rpx'
    },
    height: {
      // 高度
      type: String,
      default: '100%'
    }
  }
}
