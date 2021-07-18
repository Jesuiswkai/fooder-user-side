<template>
  <view
    class="service"
    :class="obj.action == 1 ? 'action' : ''"
    @click="clickService"
  >
    <view class="service-img">
      <image :src="obj.img" mode="" />
    </view>
    <view class="service-info">
      <view class="name">
        <view class="text">{{ obj.name }}</view>
        <view class="default" v-if="obj.default == 1">默认</view>
      </view>
      <view class="distance">距离{{ obj.distance }}km</view>
      <view class="address">{{ obj.address }}</view>
    </view>
    <view v-show="obj.action == 1" class="action">
      <image src="@/static/public/sel_pro.png" mode="" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    clickService() {
      this.$emit('info', this.obj)
    },
  },
}
</script>

<style lang="scss" scoped>
.service.action {
  border: 2rpx solid #2eb232;
}
.service {
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
  position: relative;
  .service-img {
    width: 160rpx;
    height: 160rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .service-info {
    margin-left: 20rpx;
    width: 470rpx;
    height: 160rpx;
    .name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
      }
      .default {
        width: 100rpx;
        background: #8ec7ff;
        border-radius: 19rpx;
        font-size: 24rpx;
        font-weight: bold;
        color: #ffffff;
        padding: 6rpx 26rpx;
      }
    }
    .distance {
      font-size: 24rpx;
      font-weight: bold;
      color: #3e7841;
      margin-top: 11rpx;
    }
    .address {
      font-size: 24rpx;
      font-weight: 400;
      color: #999999;
      margin-top: 8rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
  .action {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 30rpx;
    height: 118rpx;
    image {
      width: 30rpx;
      height: 118rpx;
    }
  }
}
</style>
