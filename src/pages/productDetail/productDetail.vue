<template>
  <app-page immersiveNav>
    <view class="top">
      <u-swiper
        :list="list"
        mode="number"
        indicator-pos="bottomRight"
        height="750"
      ></u-swiper>
    </view>

    <view class="shop-info">
      <view class="shop-title">
        <view class="shop-name">¥150</view>
        <view class="shop-price">双胞胎种猪配合饲料40kg</view>
      </view>

      <view class="shop-content">
        <u-parse :html="content"></u-parse>
      </view>
    </view>

    <view class="shop-opera">
      <view class="opera-btn">
        <view class="car-img">
          <image src="@/static/shop/car.png" mode="" />
          <!-- <u-badge type="error" count="190"></u-badge> -->
        </view>
        <button class="join">加入购物车</button>
        <button class="order">立即下单</button>
      </view>
    </view>
  </app-page>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
          title: '昨夜星辰昨夜风，画楼西畔桂堂东',
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
          title: '身无彩凤双飞翼，心有灵犀一点通',
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
        },
      ],
      content: `
      <div>肾宝，味道好极了</div>
      <p>露从今夜白，月是故乡明</p>
			<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" style="width:100px;height:100px" />
      <div>肾宝，味道好极了</div>
      <p>露从今夜白，月是故乡明</p>
			<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" style="width:100px;height:100px" />
      <div>肾宝，味道好极了</div>
      <p>露从今夜白，月是故乡明</p>
			<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" style="width:100px;height:100px" />
      <div>肾宝，味道好极了</div>
      <p>露从今夜白，月是故乡明</p>
			<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" style="width:100px;height:100px" />
      <div>肾宝，味道好极了</div>
      <p>露从今夜白，月是故乡明</p>
			<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" style="width:100px;height:100px" />
      <div>肾宝，味道好极了</div>
      <p>露从今夜白，月是故乡明</p>
			<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" style="width:100px;height:100px" />
      <div>肾宝，味道好极了</div>
      <p>露从今夜白，月是故乡明</p>
			<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" style="width:100px;height:100px" />
      `,
    }
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
