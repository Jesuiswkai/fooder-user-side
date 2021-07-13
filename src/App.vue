<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    this.initLayout()
    // uni.hideTabBar()
  },
  onShow: function () {
    console.log('App Show')
    // uni.hideTabBar()
  },
  onHide: function () {
    console.log('App Hide')
    // uni.hideTabBar()
  },
  methods: {
    initLayout() {
      // 获取状态栏高度、屏幕宽度
      let { statusBarHeight, windowWidth } = uni.getSystemInfoSync()
      console.log(statusBarHeight, windowWidth)

      this.$store.commit('layout/setStatusBarHeight', {
        value: statusBarHeight,
      })

      this.$store.commit('layout/setWindowWidth', {
        value: windowWidth,
      })

      let navBarHeight = (windowWidth / 750) * 90
      this.$store.commit('layout/setNavBarHeight', {
        value: navBarHeight,
      })
    },
  },
}
</script>

<style lang="scss">
@import 'uview-ui/index.scss';

view,
scroll-view,
cover-view {
  box-sizing: border-box;
}

page {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  font-size: 30rpx;
  color: #333333;
}

button::after {
  display: none;
}

::-webkit-scrollbar {
  display: none;
}

uni-tabbar {
  .uni-tabbar {
    background-color: cornflowerblue !important;
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
  }
}
</style>
