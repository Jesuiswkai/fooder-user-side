<template>
  <app-page showNavbar immersiveNav>
    <view class="container">
      <view class="welcome">
        <image
          src="https://slmall.oss-cn-beijing.aliyuncs.com/web/login/login_text.png"
          mode=""
        />
      </view>
      <view class="center">
        <view class="form">
          <view class="phone">
            <input type="text" placeholder="请输入手机号" />
          </view>
          <view class="validate">
            <input type="text" placeholder="请输入验证码" />
            <view class="wrap">
              <u-toast ref="uToast"></u-toast>
              <u-verification-code
                :seconds="seconds"
                ref="uCode"
                @change="codeChange"
              ></u-verification-code>
              <u-button @click="getCode">{{ tips }}</u-button>
            </view>
          </view>
          <view class="check">
            <u-checkbox v-model="checked" icon-size="30" active-color="#B5CBAF">
              <text>我已阅读并同意</text>
              <text class="link">《用户协议》</text>
              <text>与</text>
              <text class="link">《隐私协议》</text>
            </u-checkbox>
          </view>
          <button class="login_btn">登录</button>
          <view class="other">
            <view>其他登录方式</view>
            <button
              open-type="getPhoneNumber"
              @getphonenumber="getPhoneNumber"
            ></button>
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
      tips: '',
      // refCode: null,
      seconds: 10,
      checked: false,
      code: null,
      encryptedData: null,
    }
  },
  onLoad() {
    this.getWxLoginParams()
  },
  methods: {
    codeChange(text) {
      this.tips = text
    },
    getCode() {
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: '正在获取验证码',
        })
        setTimeout(() => {
          uni.hideLoading()
          // 这里此提示会被this.start()方法中的提示覆盖
          this.$u.toast('验证码已发送')
          // 通知验证码组件内部开始倒计时
          this.$refs.uCode.start()
        }, 2000)
      } else {
        this.$u.toast('倒计时结束后再发送')
      }
    },
    getPhoneNumber(res) {
      this.encryptedData = res.detail.encryptedData
      this.iv = res.detail.iv
      this.wxlogin()
    },
    // 获取微信登录信息
    getWxLoginParams() {
      uni.login({
        provider: 'weixin',
        success: (res) => {
          this.code = res.code
        },
      })
    },
    wxlogin() {
      this.Api.user.login
        .do({
          code: this.code,
          encryptedData: this.encryptedData,
          iv: this.iv,
        })
        .then((res) => {
          this.$store.commit('auth/login', res)
          uni.switchTab({
            url: '../index/index',
          })
          this.getUserInfo()
        })
    },
    // 获取用户信息
    getUserInfo() {
      this.Api.user.getInfo.do().then((res) => {
        this.$store.commit('auth/openId', res.user.openId)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container::before,
.center::before {
  display: table;
  content: '';
}
.container {
  width: 100%;
  height: 100%;
  font-family: 'PingFang SC';
  background-image: url(https://slmall.oss-cn-beijing.aliyuncs.com/web/login/login_bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .welcome {
    width: 152rpx;
    height: 116rpx;
    margin-top: 243rpx;
    margin-left: 30rpx;
    image {
      width: 152rpx;
      height: 116rpx;
    }
  }
  .center {
    width: 690rpx;
    // height: 1050rpx;
    background: #ffffff;
    border-radius: 20rpx;
    margin: 0 auto;
    margin-top: 185rpx;
    .form {
      width: 630rpx;
      margin: 0 auto;
      margin-top: 30rpx;
      input {
        width: 100%;
        height: 110rpx;
        border-bottom: 2rpx solid #e5e5e5;
        font-size: 36rpx;
        font-weight: 400;
        color: #999999;
      }
      .validate {
        position: relative;
        .wrap {
          position: absolute;
          right: 0rpx;
          top: 50%;
          transform: translateY(-50%);
        }
        ::v-deep .u-btn {
          width: 200rpx !important;
          height: 60rpx !important;
          background: #b5cbaf;
          border-radius: 30rpx;
          font-size: 30rpx;
          font-weight: 400;
          color: #ffffff;
        }
      }
      .check {
        margin-top: 60rpx;
        text {
          font-size: 24rpx;
          font-weight: 400;
          color: #999999;
        }
        text.link {
          color: #5ba8ff;
        }
        ::v-deep .u-checkbox__icon-wrap {
          width: 30rpx !important;
          height: 30rpx !important;
        }
        ::v-deep .u-checkbox__label {
          margin: 0;
          margin-left: 20rpx;
        }
      }
      .login_btn {
        margin-top: 180rpx;
        width: 100%;
        height: 100rpx;
        background: #3e7841;
        border-radius: 80rpx;
        font-size: 36rpx;
        font-weight: 400;
        line-height: 100rpx;
        color: #ffffff;
      }
      .other {
        margin-top: 120rpx;
        text-align: center;
        padding-bottom: 100rpx;
        view {
          font-size: 24rpx;
          font-weight: 400;
          color: #999999;
        }
        // image {
        //   margin-top: 80rpx;
        //   width: 69rpx;
        //   height: 58rpx;
        // }
        button {
          margin-top: 80rpx;
          width: 69rpx;
          height: 58rpx;
          background: url('https://slmall.oss-cn-beijing.aliyuncs.com/web/login/wechart.png')
            no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>