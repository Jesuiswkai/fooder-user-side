<template>
  <app-page title="提货信息" :bgColor="bgColor" showNavbar>
    <view class="container">
      <view class="card" v-for="(item, index) of cardList">
        <view class="info">
          <view class="personal">
            <view class="name">{{ item.name }}</view>
            <view class="phone-and-img">
              <view class="phone">{{ item.phone }}</view>
              <image src="@/static/public/right.png" mode="" />
            </view>
          </view>
          <view class="address">{{ item.address }}</view>
        </view>
        <view class="card-opera">
          <view class="default-address" :class="item.default ? 'action' : ''">
            <text>默认地址</text>
            <u-switch
              v-model="item.default"
              size="30"
              active-color="#fff"
              @change="change(item)"
            ></u-switch>
          </view>
          <view class="remove">删除</view>
        </view>
      </view>
    </view>

    <view class="opera">
      <button>添加收货地址</button>
    </view>
  </app-page>
</template>

<script>
export default {
  data() {
    return {
      bgColor: '#f5f5f5',
      cardList: [
        {
          code: '1',
          name: '陈锐',
          phone: '18002334272',
          address: '重庆市江北区西普大厦10-1',
          default: true,
        },
        {
          code: '2',
          name: '万锴',
          phone: '17623563437',
          address: '重庆市江北区西普大厦10-1-1',
          default: false,
        },
        {
          code: '3',
          name: '青青',
          phone: '17623563437',
          address: '重庆市江北区西普大厦10-1-2',
          default: false,
        },
      ],
    }
  },
  methods: {
    change(data) {
      console.log(1)
      if (data.default) {
        for (let item of this.cardList) {
          if (item.code != data.code) {
            item.default = false
          }
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .u-switch {
  .u-switch__node {
    width: 28rpx !important;
    height: 28rpx !important;
    background: #cccccc;
  }
}
::v-deep .u-switch--on {
  .u-switch__node {
    background: #9dd98d !important;
  }
}
.container {
  width: 690rpx;
  margin: 0 auto;
  margin-top: 30rpx;
  padding-bottom: 220rpx;
  .card:not(:last-child) {
    margin-bottom: 30rpx;
  }
  .card {
    width: 690rpx;
    height: 276rpx;
    background: #fff;
    border-radius: 20rpx;
    .info {
      height: 164rpx;
      border-bottom: 2rpx solid #f5f5f5;
      padding: 30rpx;
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
      .personal {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .phone-and-img {
          display: flex;
          align-items: center;
          image {
            margin-left: 60rpx;
            width: 12rpx;
            height: 20rpx;
          }
        }
      }
      .address {
        margin-top: 20rpx;
        color: #666666;
      }
    }
    .card-opera {
      height: 110rpx;
      padding: 30rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24rpx;
      font-weight: bold;
      color: #ffffff;
      .default-address.action {
        background: #9dd98d;
      }
      .default-address {
        width: 202rpx;
        height: 50rpx;
        background: #cccccc;
        border-radius: 25rpx;
        padding: 0rpx 12rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .remove {
        width: 120rpx;
        height: 50rpx;
        line-height: 50rpx;
        background: #ffaeae;
        border-radius: 25rpx;
        text-align: center;
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