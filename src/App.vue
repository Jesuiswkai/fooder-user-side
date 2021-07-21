<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    this.initLayout()
    this.platform()
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
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
    platform() {
      // #ifdef APP-PLUS
      const platform = uni.getSystemInfoSync().platform
      switch (platform) {
        case 'android':
          this.$store.commit('auth/platform', 0)
          break
        case 'ios':
          this.$store.commit('auth/platform', 1)
          break
      }
      // #endif
      // #ifdef MP-WEIXIN
      this.$store.commit('auth/platform', 2)
      // #endif
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
