<template>
  <view class="container">
    <view class="modal">
      <view class="head">
        <image src="@/static/public/update_head.png" mode="" />
      </view>
      <view class="body">
        <view class="title">更新内容</view>
        <view class="updates" v-for="(item, index) of updateList" :key="index">
          <view class="update-item">{{ index + 1 }}.{{ item.content }}</view>
        </view>
        <view class="tip">
          <u-checkbox v-model="checked" size="30">本次更新不再提示</u-checkbox>
        </view>
        <view class="opera">
          <button>以后再说</button>
          <button>现在升级</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      updateList: [
        { content: '优化部分服务体验' },
        { content: '优化了部分UI设计' },
      ],
      checked: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: relative;
  font-family: 'PingFang SC';
  .modal {
    width: 690rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 20rpx;
    .head {
      width: 100%;
      height: 220rpx;
      image {
        width: 100%;
        height: 220rpx;
      }
    }
    .body {
      padding: 30rpx;
      .title {
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20rpx;
      }
      .updates {
        .update-item {
          font-size: 24rpx;
          font-weight: 400;
          color: #666666;
          margin-bottom: 15rpx;
        }
      }
      .tip {
        margin-top: 90rpx;
      }
      .opera {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30rpx;
        button {
          width: 300rpx;
          height: 80rpx;
          font-size: 30rpx;
          font-weight: bold;
          border-radius: 40rpx;
        }
        :first-child {
          background: #f5f5f5;
          color: #333333;
        }
        :last-child {
          background: #2eb232;
          color: #ffffff;
        }
      }
    }
  }
}

::v-deep .u-checkbox__label {
  color: #999 !important;
  font-size: 24rpx !important;
  margin-left: 20rpx !important;
}
</style>