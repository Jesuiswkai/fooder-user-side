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
            <view>¥{{ item.amount }}</view>
            <view>满{{ item.condition }}可用</view>
          </view>
          <view class="coupon-info">
            <view>{{ item.name }}</view>
            <view>{{ item.time }}</view>
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
  </app-page>
</template>

<script>
export default {
  data() {
    return {
      bgColor: '#f5f5f5',
      couponList: [
        {
          action: 0,
          amount: '10',
          condition: '100',
          name: '商品满减券',
          time: '有效期2021.06.16至2021.06.30',
        },
        {
          action: 0,
          amount: '20',
          condition: '80',
          name: '商品满减券',
          time: '有效期2021.06.16至2021.06.30',
        },
      ],
    }
  },
  methods: {
    handleSelectCoupon(data) {
      for (let item of this.couponList) {
        if (item.action == 1) {
          item.action = 0
        }
      }
      data.action = 1
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
</style>