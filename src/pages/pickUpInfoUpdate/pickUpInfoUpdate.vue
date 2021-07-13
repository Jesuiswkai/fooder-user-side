<template>
  <app-page title="提货信息" :bgColor="bgColor" showNavbar>
    <view class="container">
      <u-input v-model="value" type="text" />
      <u-input v-model="value" type="select" @click="show = true" />
      <u-select v-model="show" :list="list"></u-select>
    </view>
  </app-page>
</template>

<script>
export default {
  data() {
    return {
      bgColor: '#f5f5f5',
      value: '',
      show: false,
      list: [
        {
          value: '1',
          label: '江',
        },
        {
          value: '2',
          label: '湖',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 690rpx;
  margin: 0 auto;
  margin-top: 30rpx;
  padding-bottom: 220rpx;
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