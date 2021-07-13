<template>
  <view class="shop-list">
    <view class="line" v-for="(item, index) of list" :key="index">
      <view>{{ item.name }}</view>
      <view :class="item.orange == 1 ? 'price' : ''">
        <text v-if="item.minus == 1">-</text>
        <text>¥</text>
        <text>{{ item.price }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.shop-list {
  font-family: 'PingFang SC';
  padding: 20rpx;
  background: #fff;
  border-radius: 20rpx;
  .line:not(:last-child) {
    margin-bottom: 20rpx;
  }
  .line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24rpx;
    font-weight: bold;
    view {
      color: #333333;
    }
    .price {
      color: #ff7539;
    }
  }
}
</style>