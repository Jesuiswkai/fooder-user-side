<template>
  <app-page title="消息通知" :bgColor="bgColor" showNavbar>
    <view class="container">
      <view class="center">
        <view
          class="message-list"
          v-for="(item, index) of messageList"
          :key="index"
        >
          <view class="time">{{ item.time }}</view>
          <view class="info">{{ item.info }}</view>
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
      messageList: [
        {
          time: '2021.6.30 11:43:25',
          info: 'The past year and half has been a privilege collaborating with the Design team a',
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
  font-family: 'PingFang SC';
  .center {
    .message-list {
      width: 100%;
      padding: 20rpx;
      font-size: 30rpx;
      font-weight: 400;
      background: #ffffff;
      border-radius: 20rpx;
      margin-bottom: 30rpx;
      .time {
        color: #999999;
      }
      .info {
        color: #666666;
        margin-top: 20rpx;
      }
    }
  }
}
</style>