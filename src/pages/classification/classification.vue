<template>
  <app-page isTabPage immersiveNav current="1">
    <view class="container">
      <view class="classify-top">
        <view></view>
        <view class="classify-title">分类</view>
      </view>

      <view class="search-input">
        <image class="search-img" src="@/static/public/search.png" mode="" />
        <input
          v-model="searchValue"
          :focus="searchFocus"
          type="text"
          placeholder="输入关键词搜索"
        />
        <view class="operation">
          <image
            v-show="clearBtnShow"
            class="search-clear"
            src="@/static/public/clear.png"
            mode=""
            @click="clearSearch"
          />
          <button size="mini">搜索</button>
        </view>
      </view>

      <view class="classify-list">
        <view class="classify-first">
          <view
            class="first-item"
            :class="item.action == 1 ? 'first-item-action' : ''"
            v-for="(item, index) of firstList"
            :key="index"
          >
            <view class="first-img">
              <image
                :src="item.url"
                mode=""
                :style="{ width: item.width, height: item.height }"
              />
            </view>
            <view class="text">{{ item.text }}</view>
          </view>
        </view>
        <view class="classify-second">
          <view
            class="second-item"
            :class="item.action == 1 ? 'second-item-action' : ''"
            v-for="(item, index) of secondList"
            :key="index"
            >{{ item.text }}</view
          >
        </view>
      </view>

      <view class="classify-content">
        <view class="classify-result">
          <view class="shop-list">
            <shop-item
              class="shop-item"
              v-for="(item, index) of shopList"
              :key="index"
              :obj="item"
              @info="getShopInfo"
            ></shop-item>
          </view>
        </view>
      </view>
    </view>
  </app-page>
</template>

<script>
import shopItem from '@/components/ShopItem/index.vue'
import shop1 from '@/static/index/shop1.png'
import shop2 from '@/static/index/shop2.png'

import classify1 from '@/static/classifycation/classify1.png'
import classify2 from '@/static/classifycation/classify2.png'
import classify3 from '@/static/classifycation/classify3.png'
import classify4 from '@/static/classifycation/classify4.png'
import classify5 from '@/static/classifycation/classify5.png'
export default {
  components: {
    shopItem,
  },
  data() {
    return {
      clearBtnShow: false, //是否显示清空按钮
      searchFocus: false, //是否获取焦点
      searchValue: '',
      historySearchList: ['猪饲料', '鸡饲料', '保健品', '饲养设备 猪食槽'],
      shopList: [
        { src: shop1, name: '双胞胎种猪配合饲料40kg', price: '¥100' },
        { src: shop2, name: '双胞胎种猪配合饲料60kg', price: '¥150' },
        { src: shop2, name: '双胞胎种猪配合饲料80kg', price: '¥200' },
      ],
      firstList: [
        {
          url: classify1,
          text: '猪料',
          width: '52rpx',
          height: '40rpx',
          action: 1,
        },
        { url: classify2, text: '鱼料', width: '52rpx', height: '29rpx' },
        { url: classify3, text: '动保', width: '40rpx', height: '40rpx' },
        { url: classify4, text: '消耗品', width: '20rpx', height: '40rpx' },
        { url: classify5, text: '设备', width: '40rpx', height: '40rpx' },
      ],
      secondList: [
        { text: '全部', action: 1 },
        { text: '教保料' },
        { text: '育肥料' },
        { text: '繁殖猪料' },
        { text: '浓缩预混料' },
      ],
    }
  },
  watch: {
    searchValue(newVal, oldVal) {
      if (this.searchValue != '') {
        this.clearBtnShow = true
      } else {
        this.clearBtnShow = false
      }
    },
  },
  methods: {
    clearSearch() {
      this.searchValue = ''
      this.searchFocus = true
    },
    getShopInfo(data) {
      console.log(data)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 690rpx;
  margin: 0 auto;
  font-family: 'PingFang SC';
  .classify-top {
    // height: 188rpx;
    :first-child {
      height: 88rpx;
    }
    .classify-title {
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
    }
  }

  .search-input {
    width: 100%;
    height: 80rpx;
    margin-top: 20rpx;
    position: relative;
    .search-img {
      width: 20rpx;
      height: 20rpx;
      position: absolute;
      top: 50%;
      left: 10rpx;
      transform: translateY(-50%);
    }
    input {
      height: 100%;
      background: #fff;
      color: #999;
      font-size: 24rpx;
      font-weight: 400;
      padding-left: 40rpx;
      padding-right: 180rpx;
      border-radius: 20rpx;
    }
    .operation {
      position: absolute;
      top: 50%;
      right: 10rpx;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      .search-clear {
        width: 30rpx;
        height: 30rpx;
        margin-right: 30rpx;
      }
      button {
        width: 100rpx;
        height: 60rpx;
        line-height: 60rpx;
        font-size: 24rpx;
        font-weight: bold;
        color: #ffffff;
        background: #3e7841;
        text-align: center;
        padding: 0rpx;
      }
    }
  }

  .classify-list {
    .classify-first {
      padding: 0rpx 20rpx;
      margin-top: 30rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .first-item {
        .first-img {
          width: 90rpx;
          height: 90rpx;
          background: #fff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .text {
          margin-top: 8rpx;
          text-align: center;
          font-size: 30rpx;
          font-weight: 400;
          color: #333333;
        }
      }
      .first-item-action {
        .first-img {
          background: linear-gradient(180deg, #c7ffb8 0%, #ffffff 100%);
        }
        .text {
          color: #3e7841;
        }
      }
    }
    .classify-second {
      margin-top: 50rpx;
      display: -webkit-box;
      overflow-x: auto;
      :not(:first-child) {
        margin-left: 30rpx;
        padding: 4rpx 24rpx;
      }
      :first-child {
        padding: 4rpx 36rpx;
      }
      .second-item {
        background: #ffffff;
        border-radius: 19rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #666666;
      }
      .second-item-action {
        background: #70b274;
        color: #ffffff;
      }
    }
    .classify-second::-webkit-scrollbar {
      display: none;
    }
  }

  .classify-content {
    .hot-history {
      margin-top: 30rpx;
    }
    .classify-result {
      .shop-list {
        margin-top: 30rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
