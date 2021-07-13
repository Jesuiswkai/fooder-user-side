<template>
  <app-page title="选择服务商" showNavbar :bgColor="bgColor">
    <view class="container">
      <view class="service-title">
        <view class="text">我的服务商</view>
        <view class="area" @click="openAreaSelect">
          <u-picker
            mode="selector"
            v-model="areaSelectShow"
            :default-selector="[0]"
            :range="selectorObj"
            range-key="cateName"
          ></u-picker>
          <view class="area-text">重庆</view>
          <image src="@/static/public/right.png" mode="" />
        </view>
      </view>

      <view class="service-list">
        <service-item
          v-for="(item, index) of serviceList"
          :key="index"
          :obj="item"
          @info="getServiceInfo"
        ></service-item>
      </view>
    </view>

    <view class="confirm-service">
      <view class="btn-box">
        <button>确认服务商</button>
      </view>
    </view>
  </app-page>
</template>

<script>
import serviceItem from '@/components/ServiceItem/index.vue'
import shop1 from '@/static/index/shop1.png'
export default {
  components: {
    serviceItem,
  },
  data() {
    return {
      bgColor: '#f5f5f5',
      serviceList: [
        {
          img: shop1,
          name: '西普6号',
          default: 1,
          distance: '2.80',
          address:
            '重庆市渝中区纯阳洞5号重庆市渝中区纯阳洞5号重庆市渝中区纯阳洞5号',
        },
        {
          img: shop1,
          name: '西普4号',
          default: 0,
          distance: '1.80',
          address: '重庆市渝中区上清寺路107号',
        },
      ],
      areaSelectShow: false,
      selectorObj: [
        {
          cateName: '1',
          id: 1,
        },
        {
          cateName: '2',
          id: 2,
        },
      ],
    }
  },
  methods: {
    getServiceInfo(data) {
      console.log(data)
    },
    openAreaSelect() {
      this.areaSelectShow = true
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 690rpx;
  margin: 0 auto;
  margin-top: 30rpx;
  font-family: 'PingFang SC';
  .service-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      font-size: 36rpx;
      font-weight: bold;
      color: #333333;
    }
    .area {
      display: flex;
      align-items: center;
      .area-text {
        font-size: 30rpx;
        font-weight: bold;
        color: #666666;
      }
      image {
        margin-left: 10rpx;
        width: 12rpx;
        height: 20rpx;
      }
    }
  }

  .service-list {
    margin-top: 30rpx;
    padding-bottom: 178rpx;
  }
}

.confirm-service {
  position: fixed;
  bottom: 0rpx;
  width: 100%;
  height: 178rpx;
  background: #fff;
  .btn-box {
    margin-top: 20rpx;
    button {
      width: 690rpx;
      height: 70rpx;
      line-height: 70rpx;
      background: #2eb232;
      color: #fff;
      border-radius: 45px;
      font-size: 24rpx;
      font-weight: bold;
    }
  }
}
</style>
