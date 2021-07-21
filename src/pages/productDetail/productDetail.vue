<template>
  <app-page immersiveNav>
    <view class="top">
      <u-swiper
        :list="productInfo.imageList"
        mode="number"
        indicator-pos="bottomRight"
        height="750"
      ></u-swiper>
    </view>

    <view class="shop-info">
      <view class="shop-title">
        <view class="shop-name">¥{{ productInfo.money }}</view>
        <view class="shop-price">{{ productInfo.name }}</view>
      </view>

      <view class="shop-content">
        <u-parse :html="productInfo.desc"></u-parse>
      </view>
    </view>

    <view class="shop-opera">
      <view class="opera-btn">
        <view class="car-img">
          <image src="@/static/shop/car.png" mode="" />
          <u-badge
            type="error"
            :count="shopCarCount"
            :offset="[-10, -22]"
            size="mini"
          ></u-badge>
        </view>
        <button class="join" @click="joinShopCart">加入购物车</button>
        <button class="order" @click="orderNow">立即下单</button>
      </view>
    </view>
  </app-page>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      productInfo: {
        id: '',
        imageList: [],
        money: '',
        name: '',
        desc: '',
      },
      shopCarCount: 0,
    }
  },
  onLoad(data) {
    this.id = data.id
    this.getGoodsInfo(data)
    this.getShopCarCount()
  },
  methods: {
    getGoodsInfo(data) {
      this.Api.product.getGoodsInfo.do(data).then((res) => {
        for (let obj in this.productInfo) {
          this.productInfo[obj] = res[obj]
        }
      })
    },
    getShopCarCount() {
      this.Api.product.userShopCarCount.do().then((res) => {
        this.shopCarCount = res.count
      })
    },
    joinShopCart() {
      this.Api.product.saveShopCar
        .do({
          goodId: this.id,
          num: 1,
        })
        .then((res) => {
          uni.showToast({
            title: '加入购物车成功',
            icon: 'none',
          })
          this.getShopCarCount()
        })
    },
    orderNow() {
      const data = {
        providersId: this.$store.getters['other/getProvider'].id,
        pickWay: 1,
        goods: [{ goodsId: this.productInfo.id, num: 1 }],
      }
      this.Api.order.orderNow.do(data).then((res) => {
        uni.navigateTo({
          url: '../order/order?previewData=' + res,
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.shop-info {
  width: 690rpx;
  margin: 0 auto;
  font-family: 'PingFang SC';
  padding-bottom: 220rpx;
  .shop-title {
    .shop-name {
      margin-top: 27rpx;
      font-size: 50rpx;
      font-weight: bold;
      color: #ff2424;
    }
    .shop-price {
      margin-top: 30rpx;
      font-size: 36rpx;
      font-weight: bold;
      color: #333333;
    }
  }
  .shop-content {
    margin-top: 42rpx;
    padding: 30rpx;
    border-radius: 20rpx;
    background: #fff;
  }
}

.shop-opera {
  position: fixed;
  bottom: 0rpx;
  width: 100%;
  height: 178rpx;
  background: #fff;
  box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.15);
  .opera-btn {
    width: 100%;
    height: 110rpx;
    padding: 0rpx 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .car-img {
      position: relative;
      width: 70rpx;
      height: 70rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    button {
      width: 290rpx;
      height: 70rpx;
      line-height: 70rpx;
      border-radius: 45rpx;
      font-size: 24rpx;
      font-weight: bold;
      color: #ffffff;
    }
    .join {
      background: #ffc339;
    }
    .order {
      background: #2eb232;
    }
  }
}
</style>
