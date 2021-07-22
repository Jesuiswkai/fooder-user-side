<template>
  <app-page title="提货信息" :bgColor="bgColor" showNavbar>
    <view class="container">
      <view class="form-item">
        <view class="label">收货人</view>
        <view class="value">
          <input
            v-model="form.userName"
            type="text"
            placeholder="请输入收货人"
          />
          <image
            v-show="form.userName != ''"
            @click="emptyInput('userName')"
            src="@/static/public/personal_clear.png"
            mode=""
          />
        </view>
      </view>

      <view class="form-item">
        <view class="label">手机号</view>
        <view class="value">
          <input v-model="form.phone" type="digit" placeholder="请输入手机号" />
          <image
            v-show="form.phone != ''"
            src="@/static/public/personal_clear.png"
            mode=""
            @click="emptyInput('phone')"
          />
        </view>
      </view>

      <view class="form-item" @click="openAddressList">
        <view class="label">所在地区</view>
        <view class="value">
          <input type="text" disabled :placeholder="regionText" />
          <image src="@/static/public/personal_goto.png" mode="" />
        </view>
      </view>

      <view class="form-item">
        <view class="label">详细地址</view>
        <view class="value">
          <input
            v-model="form.detail"
            type="text"
            placeholder="请输入详细地址"
          />
          <image
            v-show="form.detail != ''"
            src="@/static/public/personal_clear.png"
            mode=""
            @click="emptyInput('detail')"
          />
        </view>
      </view>

      <view class="default">
        <view class="label">设置默认地址</view>
        <view>
          <u-switch
            v-model="form.isDefault"
            active-color="#9DD98D"
            size="36"
            @change="changeDefaultAddress"
          ></u-switch>
        </view>
      </view>
    </view>
    <u-select
      v-model="show"
      mode="mutil-column-auto"
      :list="list"
      @confirm="confirm"
    ></u-select>
    <view class="opera">
      <button @click="save">保存</button>
    </view>
  </app-page>
</template>

<script>
import { regionData } from 'element-china-area-data'
export default {
  data() {
    return {
      bgColor: '#f5f5f5',
      form: {
        id: '',
        userName: '', //收货人
        phone: '', //手机号
        province: '', //省份
        city: '', //市
        area: '', //区
        detail: '', //详细地址
        isDefault: 0, //是否是默认地址 0：否 1：是
      },
      list: regionData,
      show: false,
      regionText: '请选择',
    }
  },
  onLoad(data) {
    if (data.id) {
      this.getAddressInfo(data.id)
    }
  },
  methods: {
    openAddressList() {
      this.show = true
    },
    emptyInput(key) {
      this.form[key] = ''
    },
    // 获取详情
    getAddressInfo(id) {
      this.Api.user.getAddressInfo.do({ id: id }).then((res) => {
        for (let key in this.form) {
          this.form[key] = res[key]
        }
        this.regionText = res.province + ' ' + res.city + ' ' + res.area
      })
    },
    // 选择省市区
    confirm(data) {
      const arr = data.map((item) => {
        return item.label
      })
      this.form.province = arr[0]
      this.form.city = arr[1]
      this.form.area = arr[2]
      this.regionText = arr.join(' ')
    },
    // 设置是否默认地址
    changeDefaultAddress(val) {
      this.form.isDefault = val ? 1 : 0
    },
    save() {
      let title = ''
      for (let key in this.form) {
        if (this.form.userName == '') {
          title = '收货人'
          break
        } else if (this.form.phone == '') {
          title = '手机号'
          break
        } else if (this.form.province == '') {
          title = '所在地区'
          break
        } else if (this.form.detail == '') {
          title = '详细地址'
          break
        } else {
          title = ''
        }
      }
      if (title != '') {
        uni.showToast({
          title: title + '不能为空',
          icon: 'none',
          duration: 2000,
        })
        return
      }
      if (this.form.id) {
        // 修改地址
        this.Api.user.updateUserAddress.do(this.form).then((res) => {
          uni.navigateBack()
          uni.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 2000,
          })
        })
      } else {
        // 保存地址
        this.Api.user.saveUserAddress.do(this.form).then((res) => {
          uni.navigateBack()
          uni.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 2000,
          })
        })
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
  width: 690rpx;
  margin: 0 auto;
  padding-bottom: 220rpx;
  font-family: 'PingFang SC';
  .form-item {
    margin-top: 30rpx;
    > .label {
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
    }
    > .value {
      margin-top: 20rpx;
      height: 80rpx;
      background: #ffffff;
      border-radius: 20rpx;
      padding: 0 30rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        width: 90%;
        height: 100%;
        font-size: 30rpx;
        font-weight: 400;
        color: #666666;
      }
      image {
        width: 30rpx;
        height: 30rpx;
      }
    }
  }
  .default {
    margin-top: 60rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > .label {
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
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