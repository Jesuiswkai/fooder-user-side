<template>
  <app-page isTabPage immersiveNav current="0">
    <view class="index-top">
      <view class="gradient">
        <view class="title">百脉羹</view>
      </view>
      <view class="bg"></view>
      <u-swiper
        class="swiper"
        :list="list"
        height="320rpx"
        indicator-pos="bottomRight"
      ></u-swiper>
    </view>

    <view class="index-center">
      <view class="search-line">
        <view class="service-pro" @click="toService">
          <view class="img">
            <image :src="latelyProviders.image" mode="" />
          </view>
          <view class="distance">
            <view class="name">
              <view>{{ latelyProviders.name }}</view>
              <image
                src="@/static/index/right.png"
                mode=""
                style="width: 10rpx; height: 18rpx"
              />
            </view>
            <view class="number">距离{{ latelyProviders.distanceString }}</view>
          </view>
        </view>
        <view class="search-input" @click="toSearch">
          <image src="@/static/public/search.png" mode="" />
          <input type="text" placeholder="输入关键词搜索" disabled />
        </view>
        <view class="scan-qr" @click="scanCode">
          <image src="@/static/index/qrcode.png" mode="" />
        </view>
      </view>

      <view class="shop-type">
        <view
          class="shop-type-list"
          v-for="(item, index) of shopTypeList"
          :key="index"
        >
          <image :src="item.image" mode="" />
          <view class="shop-type-name">
            <view class="type-name">{{ item.name }}</view>
            <image src="@/static/index/typeName.png" mode="" />
          </view>
        </view>
      </view>

      <view class="highly-rec">
        <view class="text">重点推荐</view>
        <view class="shop-list">
          <view
            class="shop-item"
            v-for="(item, index) of shopList"
            :key="index"
          >
            <image :src="item.img" mode="" />
            <view class="shop-name">{{ item.name }}</view>
            <view class="shop-price">{{ item.money }}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="about-us">
      <image :src="aboutUsImage" mode="" />
    </view>
  </app-page>
</template>

<script>
import shopType1 from '@/static/index/shopType1.png'
import shopType2 from '@/static/index/shopType2.png'
import shopType3 from '@/static/index/shopType3.png'
import shopType4 from '@/static/index/shopType4.png'
import shopType5 from '@/static/index/shopType5.png'
import shop1 from '@/static/index/shop1.png'
import shop2 from '@/static/index/shop2.png'
export default {
  data() {
    return {
      longitude: null, // 经度
      latitude: null, //纬度
      list: [],
      shopTypeList: [
        { image: shopType1, name: '猪料' },
        { image: shopType2, name: '鱼料' },
        { image: shopType3, name: '动保' },
        { image: shopType4, name: '消耗品' },
        { image: shopType5, name: '设备' },
      ],
      shopList: [
        { img: shop1, name: '双胞胎种猪配合饲料40kg', money: '¥150' },
        { img: shop2, name: '双胞胎种猪配合饲料40kg', money: '¥150' },
      ],
      latelyProviders: {
        name: '',
        image: null,
        distanceString: '',
      },
      aboutUsImage: '../../static/index/aboutUs.png',
    }
  },
  onLoad() {},
  onShow() {
    this.getLocation() //获取地理位置
    this.getBannerList()
    this.getProductType()
    this.getRecommendProductList()
    this.getAboutInfo()
  },
  methods: {
    //扫码
    scanCode() {
      uni.scanCode({
        success: (res, r) => {
          console.log(JSON.stringify(res))
        },
      })
    },
    //去搜索
    toSearch() {
      uni.navigateTo({
        url: '../search/search',
      })
    },
    //去选择服务商
    toService() {
      uni.navigateTo({
        url: '../serviceProvider/serviceProvider',
      })
    },
    //获取banner列表
    getBannerList() {
      this.Api.other.getBannerList.do().then((res) => {
        this.list = res
      })
    },
    //获取最近服务商
    getLatelyProviders(longitude, latitude) {
      this.Api.provide.getLatelyProviders
        .do({
          longitude: longitude,
          dimension: latitude,
        })
        .then((res) => {
          this.latelyProviders.name = res.name
          this.latelyProviders.distanceString = res.distanceString
          this.latelyProviders.image = res.image
        })
    },
    //获取地理位置
    getLocation() {
      uni.getLocation({
        success: (res) => {
          this.longitude = res.longitude
          this.latitude = res.latitude
          this.getLatelyProviders(this.longitude, this.latitude)
        },
      })
    },
    //获取商品一级分类
    getProductType() {
      this.Api.product.getParentGoodTypeList.do().then((res) => {
        this.shopTypeList = res
      })
    },
    //获取推荐商品列表
    getRecommendProductList() {
      this.Api.product.getRecommendGoodsList.do().then((res) => {
        this.shopList = res
      })
    },
    //获取相关信息
    getAboutInfo() {
      this.Api.other.getAboutInfo.do({ type: 3 }).then((res) => {
        this.aboutUsImage = res.image
      })
    },
  },
}
</script>

<style lang="scss" scoped>
//顶部&banner
.index-top {
  width: 100%;
  position: relative;
  .gradient {
    height: 368rpx;
    background: linear-gradient(180deg, #d5eedb 30%, #f5f5f5 100%);
    .title {
      font-size: 30rpx;
      font-weight: bold;
      line-height: 47rpx;
      color: #333333;
      position: absolute;
      top: 118rpx;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .bg {
    height: 140rpx;
    background: #f5f5f5;
  }
  .swiper {
    width: 690rpx;
    position: absolute;
    bottom: 0rpx;
    left: 50%;
    transform: translateX(-50%);
  }
}

//中间内容
.index-center {
  width: 690rpx;
  margin: 0 auto;
  margin-top: 30rpx;
  //搜索栏
  .search-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .service-pro {
      width: 240rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .img {
        width: 80rpx;
        height: 80rpx;
        border-radius: 20rpx;
        image {
          width: 80rpx;
          height: 80rpx;
        }
      }
      .distance {
        width: 140rpx;
        height: 80rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .name {
          font-size: 24rpx;
          color: #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .number {
          font-size: 20rpx;
          color: #666;
        }
      }
    }
    .search-input {
      position: relative;
      width: 330rpx;
      image {
        width: 20rpx;
        height: 20rpx;
        position: absolute;
        top: 50%;
        left: 10rpx;
        transform: translateY(-50%);
      }
      input {
        height: 80rpx;
        background: #fff;
        padding: 0rpx 40rpx;
        border-radius: 20rpx;
        font-size: 24rpx;
      }
    }
    .scan-qr {
      width: 80rpx;
      height: 80rpx;
      background: #fff;
      border-radius: 20rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      image {
        width: 45rpx;
        height: 38rpx;
      }
    }
  }
  //商品类型
  .shop-type {
    margin-top: 30rpx;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    overflow-x: auto;
    .shop-type-list:not(:first-child) {
      margin-left: 30rpx;
    }
    .shop-type-list {
      image {
        width: 114rpx;
        height: 114rpx;
      }
      .shop-type-name {
        position: relative;
        .type-name {
          text-align: center;
          font-size: 30rpx;
          font-family: STZhongsong;
          font-weight: 400;
          color: #333333;
        }
        image {
          width: 115rpx;
          height: 7rpx;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  //重点推荐
  .highly-rec {
    margin-top: 30rpx;
    .text {
      font-size: 30rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #0d2a00;
    }
    .shop-list {
      margin-top: 30rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      image {
        width: 330rpx;
        height: 330rpx;
        border-radius: 20rpx;
      }
      .shop-name {
        margin-top: 20rpx;
        font-size: 24rpx;
        font-family: 'PingFang SC';
        font-weight: bold;
        color: #333333;
      }
      .shop-price {
        margin-top: 35rpx;
        margin-bottom: 10rpx;
        font-size: 24rpx;
        font-family: 'PingFang SC';
        font-weight: bold;
        color: #ff2424;
      }
    }
  }
}

//关于我们
.about-us {
  width: 690rpx;
  height: 190rpx;
  margin: 0 auto;
  margin-top: 30rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>
