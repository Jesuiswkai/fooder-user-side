<template>
  <view class="service" @click="clickService">
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
.service {
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
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
}
</style>
