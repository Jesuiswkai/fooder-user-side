<template>
  <view class="mp-app-page" :class="{ 'tab-page': isTabPage }">
    <view
      class="nav-bar"
      :class="{ 'immersive-nav': immersiveNav, 'white-nav': navWhiteBg }"
      :style="{ backgroundColor: bgColor }"
      v-if="showNavbar"
    >
      <view class="status-bar-area" :style="{ height: statusBarHeight + 'px' }">
      </view>
      <view class="action-area">
        <view class="title">{{ title }}</view>
        <template v-if="!isTabPage">
          <image
            v-if="!singlePageMode"
            class="back-btn"
            src="https://yyzytest.oss-cn-beijing.aliyuncs.com/yyzy/web/back.png"
            @click="back"
          >
          </image>
          <image
            v-else
            class="back-btn"
            src="https://yyzytest.oss-cn-beijing.aliyuncs.com/yyzy/web/back.png"
            @click="toHome"
          >
          </image>
        </template>
      </view>
    </view>
    <view class="page-main">
      <scroll-view
        v-if="!loading"
        scroll-y
        @scroll="pageScroll"
        :scroll-with-animation="scrollWithAnimation"
        :scroll-top="pageScrollTop"
        @scrolltolower="scrollToLower"
      >
        <slot></slot>
      </scroll-view>
      <view-loading v-else bgColor="#f8f8f8" size="50"></view-loading>
    </view>
    <!-- <tab-bar :current="current"></tab-bar> -->
  </view>
</template>

<script>
import basic from '../../index.mixin'

export default {
  mixins: [basic],
  props: {
    singlePageMode: {
      // 小程序单页面
      type: Boolean,
      default: false,
    },
    scrollWithAnimation: {
      // 页面滚动动画
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      statusBarHeight: 0,
      navWhiteBg: false,
      pageScrollTop: 0,
    }
  },
  mounted() {
    this.setStatusBarHeight()
  },
  methods: {
    scrollToLower() {
      this.$emit('scrolltolower')
    },
    back() {
      uni.navigateBack()
    },
    toHome() {
      uni.switchTab({
        url: '/pages/index/index',
      })
    },
    // 返回顶部
    backTop() {
      // this.pageScrollTop = null;
      // this.$nextTick(() => {
      //   this.pageScrollTop = 0;
      // });
      this.setPageScroll(0)
    },
    // 设置scroll-top
    setPageScroll(value) {
      this.pageScrollTop = value + 1
      this.$nextTick(() => {
        this.pageScrollTop = value
      })
    },
    pageScroll(event) {
      this.$emit('scroll', event)

      if (!this.immersiveNav) {
        return
      }

      let detail = event.detail

      if (detail.scrollTop > 100) {
        this.navWhiteBg = true
      } else {
        this.navWhiteBg = false
      }
    },
    setStatusBarHeight() {
      this.statusBarHeight = this.$store.state.layout.statusBarHeight
    },
  },
}
</script>

<style lang="scss" scoped>
.mp-app-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.tab-page {
  // height: calc(100% - 110rpx); // tabbar高度
}

.nav-bar {
  width: 100%;
  flex: none;
  background-color: white;

  .status-bar-area {
    width: 100%;
  }

  .action-area {
    width: 100%;
    height: 90rpx;
    padding: 0px 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #333333;
      font-size: 30rpx;
      font-weight: bold;
    }

    .back-btn {
      width: 20rpx;
      height: 33rpx;
      padding: 30rpx;
      position: relative;
      left: -30rpx;
    }
  }
}

.immersive-nav {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 30;
  background-color: rgba(255, 255, 255, 0) !important;
}

.white-nav {
  background-color: white !important;
}

.page-main {
  width: 100%;
  height: 0px;
  flex: auto;
  position: relative;

  scroll-view {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
  }
}
</style>
