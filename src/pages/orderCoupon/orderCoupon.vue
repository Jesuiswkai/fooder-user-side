<template>
  <app-page title="选择优惠券" :bgColor="bgColor" showNavbar>
    <view class="container">
      <view class="rule">
        <view>使用规则</view>
        <image src="@/static/public/right.png" mode="" />
      </view>
      <view class="content">
        <view
          class="coupon-list"
          v-for="(item, index) of couponList"
          :key="index"
          @click="handleSelectCoupon(item)"
        >
          <view class="coupon-price">
            <view>¥{{ item.priceStr }}</view>
            <view>满{{ item.priceConditionStr }}可用</view>
          </view>
          <view class="coupon-info">
            <view>{{ item.name }}</view>
            <view>有效期{{ item.startTime }}至{{ item.endTime }}</view>
          </view>
          <view
            class="coupon-selector"
            :class="item.action == 1 ? 'action' : ''"
          >
            <view class="round">
              <u-icon
                v-if="item.action == 1"
                name="checkmark"
                color="#FFAEAE"
                size="16"
              ></u-icon>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="opera">
      <view>
        <text>可减</text>
        <text style="color: #ff2424; margin-left: 30rpx"
          >¥{{ decreasePrice }}</text
        >
      </view>
      <view>
        <button @click="confirm">确定</button>
      </view>
    </view>
  </app-page>
</template>

<script>
export default {
  data() {
    return {
      bgColor: '#f5f5f5',
      couponList: [],
      decreasePrice: '0',
    }
  },
  onLoad(data) {
    let couponList = JSON.parse(data.couponList)
    for (let item of couponList) {
      item.action = 0
    }
    this.couponList = couponList
  },
  methods: {
    handleSelectCoupon(data) {
      for (let item of this.couponList) {
        if (item.action == 1) {
          item.action = 0
        }
      }
      data.action = 1
      this.decreasePrice = data.priceStr
    },
    confirm() {
      const data = this.couponList.filter((item) => {
        return item.action == 1
      })
      if (data.length != 0) {
        this.$store.commit('other/setCoupon', data[0])
        uni.navigateBack({
          //返回
          delta: 1,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 690rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  font-family: 'PingFang SC';
  .rule {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    view {
      font-size: 30rpx;
      font-weight: bold;
      color: #666666;
    }
    image {
      width: 12rpx;
      height: 20rpx;
      margin-left: 10rpx;
    }
  }
  .content {
    margin-top: 30rpx;
    padding-bottom: 200rpx;
    .coupon-list {
      width: 100%;
      height: 190rpx;
      background: url('@/static/coupon/coupon_bg.png') no-repeat;
      background-size: 100% 100%;
      position: relative;
      margin-bottom: 30rpx;
      .coupon-price {
        position: absolute;
        top: 50%;
        left: 43rpx;
        transform: translateY(-50%);
        :first-child {
          font-size: 36rpx;
          font-family: 'HelveticaNeue LT 95';
          font-weight: 900;
          color: #ff6a6a;
        }
        :last-child {
          font-size: 24rpx;
          font-family: 'PingFang SC';
          font-weight: bold;
          color: #666666;
          margin-top: 15rpx;
        }
      }
      .coupon-info {
        color: #333333;
        position: absolute;
        top: 50%;
        left: 248rpx;
        transform: translateY(-50%);
        :first-child {
          font-size: 30rpx;
          font-weight: bold;
        }
        :last-child {
          font-size: 24rpx;
          font-weight: 400;
          margin-top: 15rpx;
        }
      }
      .coupon-selector {
        position: absolute;
        top: 50%;
        right: 15rpx;
        transform: translateY(-50%);
        width: 38rpx;
        height: 160rpx;
        background: #f5f5f5;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        .round {
          width: 18rpx;
          height: 18rpx;
          border-radius: 50%;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .coupon-selector.action {
        background: #ffaeae;
      }
    }
  }
}
.opera {
  width: 690rpx;
  height: 100rpx;
  border-radius: 20rpx;
  background: #ffffff;
  position: fixed;
  bottom: 60rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx 0 30rpx;
  font-size: 24rpx;
  font-weight: bold;
  color: #333333;
  font-family: 'PingFang SC';
  button {
    width: 133rpx;
    height: 60rpx;
    background: #2eb232;
    border-radius: 15rpx;
    font-size: 24rpx;
    color: #ffffff;
    padding: 0;
  }
}
</style>