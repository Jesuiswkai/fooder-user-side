<template>
  <app-page title="支付成功" :bgColor="bgColor" showNavbar>
    <view class="container">
      <view class="content">
        <view class="center">
          <image
            src="https://slmall.oss-cn-beijing.aliyuncs.com/web/public/payment_successful.png"
            mode=""
          />
          <view>支付成功</view>
        </view>
      </view>
    </view>

    <view class="opera">
      <button @click="toOrderDetail">查看订单</button>
    </view>
  </app-page>
</template>

<script>
export default {
  data() {
    return {
      bgColor: '#f5f5f5',
    }
  },
  onLoad(data) {
    this.Api.product.deleteUserShopCar
      .do(JSON.parse(data.shopIds))
      .then((res) => {})
  },
  methods: {
    toOrderDetail() {
      uni.navigateTo({ url: '../orderDetail/orderDetail' })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 690rpx;
  margin: 0 auto;
  margin-top: 60rpx;
  padding-bottom: 220rpx;
  font-family: 'PingFang SC';
  .content {
    width: 100%;
    height: 530rpx;
    background: #ffffff;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .center {
      view {
        font-size: 36rpx;
        font-weight: bold;
        color: #333333;
        margin-top: 60rpx;
        text-align: center;
      }
      image {
        width: 220rpx;
        height: 220rpx;
      }
    }
  }
}

.opera {
  position: fixed;
  bottom: 0rpx;
  width: 100%;
  height: 178rpx;
  background: #fff;
  box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.15);
  button {
    width: 690rpx;
    height: 70rpx;
    margin-top: 20rpx;
    line-height: 70rpx;
    background: #2eb232;
    border-radius: 45rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>