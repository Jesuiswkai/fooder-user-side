<template>
  <view class="shop" @click="clickShop">
    <image :src="obj.src" mode="" />
    <view class="shop-name">{{ obj.name }}</view>
    <view class="shop-price">{{ obj.price }}</view>
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
    clickShop() {
      this.$emit('info', this.obj)
    },
  },
}
</script>

<style lang="scss" scoped>
.shop {
  margin-bottom: 30rpx;
  image {
    width: 330rpx;
    height: 330rpx;
    border-radius: 20rpx;
  }
  .shop-name {
    margin-top: 20rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #333333;
  }
  .shop-price {
    margin-top: 35rpx;
    margin-bottom: 10rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #ff2424;
  }
}
</style>
