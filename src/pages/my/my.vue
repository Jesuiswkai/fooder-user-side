<template>
  <app-page isTabPage immersiveNav current="3">
    <view class="container">
      <view class="head">
        <view class="title">我的</view>
        <view class="avatar-info">
          <view class="avatar"></view>
          <view class="info">
            <image
              src="https://slmall.oss-cn-beijing.aliyuncs.com/web/public/message.png"
              mode=""
            />
          </view>
        </view>
        <view class="phone">
          <view class="big">
            <text>166*****0612</text>
            <image
              src="https://slmall.oss-cn-beijing.aliyuncs.com/web/public/right.png"
              mode=""
            />
          </view>
          <view class="small">16623100612</view>
        </view>
        <view class="my-order">
          <view class="order-title">
            <view class="text">我的订单</view>
            <view class="link" @click="toMyOrder">
              <text>全部订单</text>
              <image
                src="https://slmall.oss-cn-beijing.aliyuncs.com/web/my/right.png"
                mode=""
              />
            </view>
          </view>
          <view class="order-list">
            <view
              class="order-item"
              v-for="(item, index) of orderList"
              :key="index"
            >
              <image :src="item.url" mode="" />
              <view>{{ item.text }}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="body">
        <view class="opera-list">
          <view
            class="opera-item"
            v-for="(item, index) of operaList"
            :key="index"
            @click="goto(item)"
          >
            <view class="left">{{ item.leftText }}</view>
            <view class="right">
              <view v-if="item.rightText">{{ item.rightText }}</view>
              <image
                v-else
                src="https://slmall.oss-cn-beijing.aliyuncs.com/web/public/right.png"
                mode=""
              />
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
      orderList: [
        {
          url: 'https://slmall.oss-cn-beijing.aliyuncs.com/web/my/1.png',
          text: '待支付',
        },
        {
          url: 'https://slmall.oss-cn-beijing.aliyuncs.com/web/my/2.png',
          text: '待配送',
        },
        {
          url: 'https://slmall.oss-cn-beijing.aliyuncs.com/web/my/3.png',
          text: '配送中',
        },
        {
          url: 'https://slmall.oss-cn-beijing.aliyuncs.com/web/my/4.png',
          text: '已完成',
        },
        {
          url: 'https://slmall.oss-cn-beijing.aliyuncs.com/web/my/5.png',
          text: '已取消',
        },
      ],
      operaList: [
        { leftText: '优惠券', code: 'coupon' },
        { leftText: '常用服务商管理', code: 'provider' },
        { leftText: '提货信息设置', code: 'pickUp' },
        { leftText: '联系客服', code: 'service', rightText: '023-68690743' },
        { leftText: '版本更新', code: 'versionUpdate', rightText: 'V1.0' },
        { leftText: '关于我们', code: 'aboutUs' },
      ],
    }
  },
  onShow() {
    let isLogin = this.$store.getters['auth/isLogin']
    if (!isLogin) {
      uni.navigateTo({
        url: '../login/login',
      })
    }
  },
  methods: {
    toMyOrder() {
      uni.navigateTo({
        url: '../myOrder/myOrder',
      })
    },
    goto(data) {
      switch (data.code) {
        case 'coupon':
          uni.navigateTo({
            url: '../couponList/couponList',
          })
          break
        case 'provider':
          uni.navigateTo({
            url: '../serviceProvider/serviceProvider',
          })
          break
        case 'pickUp':
          uni.navigateTo({
            url: '../pickUpInfo/pickUpInfo',
          })
          break
        case 'service':
          break
        case 'versionUpdate':
          break
        case 'aboutUs':
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container::before {
  display: table;
  content: '';
}
.container {
  font-family: 'PingFang SC';
  .head::before {
    display: table;
    content: '';
  }
  .head {
    width: 100%;
    padding: 0 30rpx 30rpx 30rpx;
    background-color: #ffffff;
    border-bottom-left-radius: 30rpx;
    border-bottom-right-radius: 30rpx;
    .title {
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      margin-top: 88rpx;
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
      text-align: center;
    }
    .avatar-info {
      margin-top: 30rpx;
      position: relative;
      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        background-color: #e0efdc;
        margin: 0 auto;
      }
      .info {
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        background-color: #f5f5f5;
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
          width: 30rpx;
          height: 28rpx;
        }
      }
    }
    .phone {
      margin-top: 30rpx;
      .big {
        text-align: center;
        text {
          font-size: 36rpx;
          font-weight: bold;
          color: #333333;
        }
        image {
          width: 12rpx;
          height: 20rpx;
          margin-left: 30rpx;
        }
      }
      .small {
        margin-top: 20rpx;
        font-size: 30rpx;
        font-weight: bold;
        color: #666666;
        text-align: center;
      }
    }
    .my-order {
      width: 100%;
      padding: 30rpx;
      margin-top: 30rpx;
      background: #f0ffec;
      border-radius: 20rpx;
      .order-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text {
          font-size: 30rpx;
          font-weight: bold;
          color: #333333;
        }
        .link {
          display: flex;
          align-items: center;
          text {
            font-size: 24rpx;
            font-weight: bold;
            color: #58884b;
          }
          image {
            width: 7rpx;
            height: 12rpx;
            margin-left: 15rpx;
          }
        }
      }
      .order-list {
        margin-top: 30rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .order-item {
          width: 110rpx;
          height: 110rpx;
          background: linear-gradient(180deg, #ffffff 0%, #f0ffec 100%);
          border-radius: 15rpx 15rpx 0 0;
          text-align: center;
          image {
            width: 60rpx;
            height: 60rpx;
          }
          view {
            font-size: 24rpx;
            font-weight: bold;
            color: #58884b;
          }
        }
      }
    }
  }
  .body {
    padding: 0rpx 30rpx 40rpx 30rpx;
    .opera-list {
      .opera-item {
        width: 100%;
        height: 100rpx;
        border-bottom: 2rpx solid #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          font-size: 30rpx;
          font-weight: bold;
          color: #333333;
        }
        .right {
          view {
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
          }
          image {
            width: 12rpx;
            height: 20rpx;
          }
        }
      }
    }
  }
}

// ::v-deep .page-main {
//   scroll-view {
//     background-color: #ffffff !important;
//   }
// }
</style>
