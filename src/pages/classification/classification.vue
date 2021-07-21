<template>
  <app-page isTabPage immersiveNav :loading="pageLoading" current="1">
    <view class="container">
      <view class="classify-top">
        <view></view>
        <view class="classify-title">分类</view>
      </view>
      <scroll-view
        style="width: 100%; height: 84vh; padding: 0 30rpx"
        scroll-y
        @scrolltolower="scrollToLower()"
        :refresher-enabled="isLogin"
        @refresherrefresh="refreshData()"
        :refresher-triggered="triggered"
      >
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
              @click="selectFirstType(item)"
            >
              <view class="first-img">
                <image
                  :src="item.image"
                  mode=""
                  :style="{ width: item.width, height: item.height }"
                />
              </view>
              <view class="text">{{ item.name }}</view>
            </view>
          </view>
          <view class="classify-second">
            <view
              class="second-item"
              :class="item.action == 1 ? 'second-item-action' : ''"
              v-for="(item, index) of secondList"
              :key="index"
              @click="selectSecondType(item)"
              >{{ item.name }}</view
            >
          </view>
        </view>

        <view class="classify-content">
          <view class="classify-result">
            <!-- <view class="shop-list"> -->
            <!-- <scroll-view
            style="width: 100%; height: 100vh"
            scroll-y
            @scrolltolower="scrollToLower()"
            :refresher-enabled="isLogin"
            @refresherrefresh="refreshData()"
            :refresher-triggered="triggered"
          > -->
            <lazy-list
              v-model="shopList.loading"
              :list="shopList.data"
              :finished="shopList.finished"
              @load="loadData"
              proxy
              ref="lazyList"
              hideLoadmore
            >
              <view class="shop-list">
                <shop-item
                  class="shop-item"
                  v-for="(item, index) of shopList.data"
                  :key="index"
                  :obj="item"
                  @info="getShopInfo"
                ></shop-item>
              </view>
            </lazy-list>
            <!-- </scroll-view> -->
            <!-- </view> -->
          </view>
        </view>
      </scroll-view>
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

import { mapGetters } from 'vuex'
export default {
  components: {
    shopItem,
  },
  data() {
    return {
      // isLogin: this.$store.getters['auth/isLogin'],
      pageLoading: true,
      isLogin: true,
      triggered: false,
      clearBtnShow: false, //是否显示清空按钮
      searchFocus: false, //是否获取焦点
      searchValue: '',
      historySearchList: ['猪饲料', '鸡饲料', '保健品', '饲养设备 猪食槽'],
      // shopList: [
      //   { src: shop1, name: '双胞胎种猪配合饲料40kg', price: '¥100' },
      //   { src: shop2, name: '双胞胎种猪配合饲料60kg', price: '¥150' },
      //   { src: shop2, name: '双胞胎种猪配合饲料80kg', price: '¥200' },
      // ],
      shopList: {
        loading: false,
        finished: false,
        page: 1,
        pageSize: 10,
        typeOneId: '',
        typeTwoId: '',
        data: [
          // { img: shop1, name: '双胞胎种猪配合饲料40kg', money: '¥100' },
          // { img: shop2, name: '双胞胎种猪配合饲料60kg', money: '¥150' },
          // { img: shop2, name: '双胞胎种猪配合饲料80kg', money: '¥200' },
        ],
      },
      firstList: [
        {
          image: classify1,
          name: '猪料',
          width: '52rpx',
          height: '40rpx',
          action: 1,
        },
        { image: classify2, name: '鱼料', width: '52rpx', height: '29rpx' },
        { image: classify3, name: '动保', width: '40rpx', height: '40rpx' },
        { image: classify4, name: '消耗品', width: '20rpx', height: '40rpx' },
        { image: classify5, name: '设备', width: '40rpx', height: '40rpx' },
      ],
      secondList: [{ id: '', name: '全部', action: 1 }],
      // scrollViewHeight: '972rpx',
    }
  },
  watch: {
    searchValue(newValue, oldValue) {
      if (this.searchValue != '') {
        this.clearBtnShow = true
      } else {
        this.clearBtnShow = false
      }
    },
  },
  onLoad() {
    this.getProductType()
  },
  methods: {
    clearSearch() {
      this.searchValue = ''
      // this.searchFocus = true
    },
    getShopInfo(data) {
      uni.navigateTo({
        url: '../productDetail/productDetail?id=' + data.id,
      })
    },
    //获取商品一级分类
    getProductType() {
      this.Api.product.getParentGoodTypeList.do().then((res) => {
        const data = []
        for (let i = 0; i < res.length; i++) {
          res[i].action = i == 0 ? 1 : 0
          data.push(res[i])
        }
        this.firstList = data
        this.getSecondType(res[0].id)
      })
    },
    //获取商品二级分类
    getSecondType(id) {
      this.secondList = this.secondList.slice(0, 1)
      this.Api.product.getGoodTypeListByParentId
        .do({
          parentId: id,
        })
        .then((res) => {
          this.secondList[0].action = 1
          for (let i = 0; i < res.length; i++) {
            res[i].action = 0
            this.secondList.push(res[i])
          }
          this.filterProductType()
        })
    },
    //选择一级分类
    selectFirstType(data) {
      for (let item of this.firstList) {
        if (item.action == 1) {
          item.action = 0
        }
      }
      data.action = 1
      this.getSecondType(data.id)
    },
    //选择二级分类
    selectSecondType(data) {
      for (let item of this.secondList) {
        if (item.action == 1) {
          item.action = 0
        }
      }
      data.action = 1
      this.filterProductType()
    },
    //筛选已选择的分类
    filterProductType() {
      let firstItem = this.firstList.filter((item) => {
        return item.action == 1
      })
      let secondItem = this.secondList.filter((item) => {
        return item.action == 1
      })
      this.shopList.finished = false
      this.shopList.page = 1
      this.shopList.typeOneId = firstItem[0].id
      this.shopList.typeTwoId = secondItem[0].id
      this.shopList.data = []
      this.loadData()
    },
    scrollToLower() {
      this.shopList.page += 1
      this.$refs['lazyList'].loadMore()
    },
    refreshData() {
      if (!this.triggered) {
        this.triggered = true
      }
      this.shopList.page = 1
      this.shopList.data = []
      this.loadData()
    },
    loadData() {
      this.shopList.loading = true
      const data = {
        page: this.shopList.page,
        pageSize: this.shopList.pageSize,
        typeOneId: this.shopList.typeOneId,
        typeTwoId: this.shopList.typeTwoId,
      }
      if (this.shopList.finished) {
        return
      }
      this.Api.product.getGoodsList.do(data).then((res) => {
        this.pageLoading = false
        this.shopList.loading = false
        this.triggered = false
        if (res.list.length != 0) {
          for (let item of res.list) {
            this.shopList.data.push(item)
          }
        } else {
          this.shopList.finished = true
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  // padding: 0 30rpx;
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
      // justify-content: space-between;
      align-items: center;
      overflow-x: auto;
      .first-item:not(:first-child) {
        margin-left: 50rpx;
      }
      .first-item {
        .first-img {
          width: 90rpx;
          height: 90rpx;
          background: #fff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          image {
            width: 52rpx;
            height: 52rpx;
          }
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
