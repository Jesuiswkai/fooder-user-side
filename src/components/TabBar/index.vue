<template>
  <view class="container">
    <view
      v-for="(item, index) in tabList"
      :key="index"
      class="navigator"
      :class="currentTabIndex == index ? 'on' : ''"
      @tap="switchTab(item, index)"
    >
      <view class="icon">
        <image
          :src="currentTabIndex == index ? item.iconAction : item.icon"
          mode=""
        />
        <!-- <text
          class="iconfont"
          :class="item.icon"
          :style="[
            currentTabIndex == index ? { color: tintColor } : { color: color },
          ]"
        ></text>
        <text v-if="item.badge" class="uni_badge">{{ item.badge }}</text>
        <text v-if="item.badgeDot" class="uni_badge uni_badge_dot"></text> -->
      </view>
      <view
        class="text"
        :style="[
          currentTabIndex == index ? { color: tintColor } : { color: color },
        ]"
        >{{ item.text }}</view
      >
    </view>
  </view>
</template>


<script>
import home from '@/static/tabBar/home.png'
import homeAction from '@/static/tabBar/home_action.png'
import classify from '@/static/tabBar/classify.png'
import classifyAction from '@/static/tabBar/classify_action.png'
import shopingCar from '@/static/tabBar/shoping_car.png'
import shopingCarAction from '@/static/tabBar/shoping_car_action.png'
import my from '@/static/tabBar/my.png'
import myAction from '@/static/tabBar/my_action.png'
export default {
  data() {
    return {
      tabList: [
        {
          icon: home,
          iconAction: homeAction,
          text: '首页',
          path: '../../pages/index/index',
        },
        {
          icon: classify,
          iconAction: classifyAction,
          text: '分类',
          path: '../../pages/classification/classification',
        },
        {
          icon: shopingCar,
          iconAction: shopingCarAction,
          text: '购物车',
          path: '../../pages/shoppingCart/shoppingCart',
        },
        {
          icon: my,
          iconAction: myAction,
          text: '我的',
        },
      ],
      currentTabIndex: this.current,
    }
  },
  props: {
    current: { type: [Number, String], default: 0 },
    color: { type: String, default: '#B5CBAF' },
    tintColor: { type: String, default: '#ffffff' },
  },
  methods: {
    switchTab(data, index) {
      this.currentTabIndex = index
      this.$emit('click', index)
      uni.switchTab({ url: data.path })
      // uni.reLaunch({ url: data.path })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 750rpx;
  height: 178rpx;
  padding: 0 30rpx;
  background: #3e7841;
  box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.15);
  border-radius: 30rpx 30rpx 0rpx 0rpx;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: fixed;
  bottom: 0;
}
.navigator {
  width: 150rpx;
  height: 110rpx;
  .icon {
    text-align: center;
    margin-top: 15rpx;
    image {
      width: 52rpx;
      height: 52rpx;
    }
  }
  .text {
    margin-top: 8rpx;
    text-align: center;
    font-size: 18rpx;
    font-weight: bold;
    color: #b5cbaf;
  }
}
</style>