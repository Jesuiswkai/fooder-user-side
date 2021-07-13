<template>
  <app-page title="消息通知" :bgColor="bgColor" showNavbar>
    <view class="container">
      <view class="center">
        <view class="qas" v-for="(item, index) of qas" :key="index">
          <view class="question">
            <view class="title">Q：</view>
            <view class="info">{{ item.question }}</view>
          </view>
          <view class="answer">
            <view class="title">A：</view>
            <view class="info">{{ item.answer }}</view>
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
      qas: [
        {
          question:
            'The past year and half has been a privilege collaborating with the Design',
          answer:
            'The past year and half has been a privilege collaborating with the Design team at Udaan. Building on their deep domain knowledge of the marketplace and users, we have been able to blend the creative storytelling, aesthetics to develop a unique visual language for the brand working with the team closely.',
        },
        {
          question:
            'The past year and half has been a privilege collaborating with the Design',
          answer:
            'The past year and half has been a privilege collaborating with the Design team at Udaan. Building on their deep domain knowledge of the marketplace and users, we have been able to blend the creative storytelling, aesthetics to develop a unique visual language for the brand working with the team closely.',
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
  font-size: 30rpx;
  font-weight: 400;
  .center {
    .qas {
      background: #ffffff;
      border-radius: 20rpx;
      padding: 20rpx;
      margin-bottom: 30rpx;
      .question {
        display: flex;
        line-height: 47rpx;
        color: #24afff;
      }
      .answer {
        display: flex;
        margin-top: 20rpx;
        line-height: 47rpx;
      }
    }
  }
}
</style>