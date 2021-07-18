<template>
  <app-page title="个人资料" :bgColor="bgColor" showNavbar>
    <view class="container">
      <view class="personal-form">
        <view class="form-item">
          <view class="title">头像</view>
          <view class="avatar">
            <image src="@/static/public/payment_successful.png" mode="" />
            <button>更换</button>
          </view>
        </view>

        <view class="form-item">
          <view class="title">昵称</view>
          <view class="input">
            <input type="text" />
            <image src="@/static/public/personal_clear.png" mode="" />
          </view>
        </view>

        <view class="form-item">
          <view class="title">手机号码</view>
          <view class="input">
            <input type="text" />
            <image src="@/static/public/personal_clear.png" mode="" />
          </view>
        </view>

        <view class="form-item">
          <view class="title">绑定微信</view>
          <view class="bind">
            <view class="state" :class="form.isBindWx == 1 ? 'bind' : ''">{{
              form.isBindWx ? '已绑定' : '未绑定'
            }}</view>
            <view class="goto">
              <text>去绑定</text>
              <image src="@/static/public/personal_goto.png" mode="" />
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
      form: {
        isBindWx: 0,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.container::before {
  display: table;
  content: '';
}
.container {
  width: 100%;
  height: 100%;
  padding: 0 30rpx;
  font-family: 'PingFang SC';
  .personal-form {
    margin-top: 30rpx;
    .form-item:not(:first-child) {
      margin-top: 30rpx;
    }
    .form-item {
      .title {
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
      }
      .title + view {
        width: 100%;
        height: 80rpx;
        background: #ffffff;
        border-radius: 20rpx;
        margin-top: 20rpx;
      }
      .avatar {
        padding: 0 10rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        image {
          width: 60rpx;
          height: 60rpx;
          border-radius: 50%;
        }
        button {
          width: 120rpx;
          height: 60rpx;
          margin: 0;
          background: #f0ffec;
          border-radius: 15rpx;
          font-size: 24rpx;
          font-weight: bold;
          color: #666666;
        }
      }
      .input {
        padding: 0 30rpx;
        display: flex;
        align-items: center;
        input {
          width: 600rpx;
          font-size: 30rpx;
          font-weight: bold;
          color: #666666;
        }
        image {
          width: 30rpx;
          height: 30rpx;
        }
      }
      .bind {
        padding: 0 30rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .state {
          font-size: 30rpx;
          font-weight: bold;
          color: #ffaeae;
        }
        .state.bind {
          color: #f0ffec;
        }
        .goto {
          display: flex;
          align-items: center;
          text {
            font-size: 30rpx;
            font-weight: bold;
            color: #666666;
          }
          image {
            width: 30rpx;
            height: 30rpx;
            margin-left: 20rpx;
          }
        }
      }
    }
  }
}
</style>