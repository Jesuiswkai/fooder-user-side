<template>
  <view class="shop-order">
    <view class="shop-img">
      <image :src="obj.url" mode="" />
    </view>

    <view class="shop-info">
      <view class="name">{{ obj.name }}</view>
      <view class="more">
        <view class="price">{{ obj.price }}</view>
        <view class="specs">{{ obj.specs }}</view>
      </view>
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
}
</script>

<style lang="scss" scoped>
.shop-order {
  font-family: 'PingFang SC';
  padding: 20rpx;
  background: #fff;
  border-radius: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .shop-img {
    width: 160rpx;
    height: 160rpx;
    image {
      width: 160rpx;
      height: 160rpx;
    }
  }
  .shop-info {
    width: 490rpx;
    height: 160rpx;
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
      font-size: 24rpx;
      font-weight: bold;
      color: #333333;
    }
    .more {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        font-size: 24rpx;
        font-weight: bold;
        color: #ff2424;
      }
      .specs {
        font-size: 24rpx;
        font-weight: bold;
        color: #666666;
      }
    }
  }
}
</style>