<template>
  <app-page title="选择服务商" showNavbar :bgColor="bgColor">
    <view class="container">
      <view class="service-title">
        <view class="text">我的服务商</view>
        <view class="area" @click="openAreaSelect">
          <!-- <u-picker
            mode="selector"
            v-model="areaSelectShow"
            :default-selector="[0]"
            :range="selectorObj"
            range-key="cateName"
          ></u-picker> -->
          <u-select
            v-model="locationObj.show"
            :list="locationObj.list"
            @confirm="confirm"
          ></u-select>
          <view class="area-text">{{ currentLocation }}</view>
          <image src="@/static/public/right.png" mode="" />
        </view>
      </view>

      <view class="service-list">
        <service-item
          v-for="(item, index) of serviceList"
          :key="index"
          :obj="item"
          @info="getServiceInfo($event, item)"
        ></service-item>
      </view>
    </view>

    <view class="confirm-service">
      <view class="btn-box">
        <button @click="setDefaultProvider">确认服务商</button>
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
      serviceList: [],
      currentLocation: '',
      locationObj: {
        show: false,
        list: [
          { label: '北京' },
          { label: '天津' },
          { label: '河北省' },
          { label: '山西省' },
          { label: '内蒙古自治区' },
          { label: '辽宁省' },
          { label: '吉林省' },
          { label: '黑龙江省' },
          { label: '上海' },
          { label: '江苏省' },
          { label: '浙江省' },
          { label: '安徽省' },
          { label: '福建省' },
          { label: '江西省' },
          { label: '山东省' },
          { label: '河南省' },
          { label: '湖北省' },
          { label: '湖南省' },
          { label: '广东省' },
          { label: '广西壮族自治区' },
          { label: '海南省' },
          { label: '重庆' },
          { label: '四川省' },
          { label: '贵州省' },
          { label: '云南省' },
          { label: '西藏自治区' },
          { label: '陕西省' },
          { label: '甘肃省' },
          { label: '青海省' },
          { label: '宁夏回族自治区' },
          { label: '新疆维吾尔自治区' },
          { label: '台湾省' },
          { label: '香港特别行政区' },
          { label: '澳门特别行政区' },
        ],
      },
      type: null,
    }
  },
  onLoad(data) {
    const city = this.$store.getters['auth/getCity']
    if (city) {
      this.currentLocation = city
      this.getProviders(city)
    }
    if (data.type == 'change') {
      this.type = 'change'
    }
  },
  methods: {
    getServiceInfo(data, row) {
      for (let item of this.serviceList) {
        if (item.action == 1) {
          item.action = 0
        }
      }
      row.action = 1
    },
    openAreaSelect() {
      this.locationObj.show = true
    },
    // 选择省级城市
    confirm(params) {
      this.currentLocation = params[0].label
      this.getProviders(params[0].label)
    },
    // 获取服务商列表
    getProviders(city) {
      const location = this.$store.getters['auth/getLocation']
      const data = {
        province: city,
        longitude: location.longitude,
        dimension: location.dimension,
      }
      this.Api.provide.providersList.do(data).then((res) => {
        for (let item of res.list) {
          item.action = 0
        }
        this.serviceList = res.list
      })
    },
    // 设置默认服务商
    setDefaultProvider() {
      console.log(this.serviceList)
      let arr = this.serviceList.filter((item) => {
        return item.action == 1
      })
      if (arr.length > 0) {
        if (this.type == 'change') {
          // 订单页重设服务商
          this.$store.commit('other/selectProvider', arr[0])
          uni.navigateBack()
        } else {
          // 设置默认服务商
          const data = {
            providersId: arr[0].id,
          }
          this.Api.provide.setDefaultProviders.do(data).then((res) => {
            this.getProviders(this.$store.getters['auth/getCity'])
            uni.showToast({
              title: '设置默认服务商成功',
              icon: 'none',
              duration: 2000,
            })
          })
        }
      } else {
        uni.showToast({
          title: '请选择服务商',
          icon: 'none',
          duration: 2000,
        })
      }
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
