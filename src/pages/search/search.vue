<template>
  <app-page title="搜索" showNavbar :bgColor="bgColor">
    <view class="container">
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

      <view class="search-content">
        <!--搜索历史&热门搜索-->
        <view v-show="hotAndHistory" class="hot-history">
          <!--搜索历史-->
          <view class="his">
            <view class="his-title">
              <view class="text">搜索历史</view>
              <image src="@/static/public/trash.png" mode="" />
            </view>
            <view class="his-content">
              <view class="his-list">
                <view
                  class="his-item"
                  v-for="(item, index) of historySearchList"
                  :key="index"
                  >{{ item }}</view
                >
              </view>
            </view>
          </view>

          <!--热门搜索-->
          <view class="hot">
            <view class="hot-title">
              <view class="text">热门搜索</view>
            </view>
            <view class="hot-content">
              <view class="hot-list">
                <view
                  class="hot-item"
                  v-for="(item, index) of hotSearchList"
                  :key="index"
                >
                  <view class="text">{{ item.text }}</view>
                  <image src="@/static/public/right.png" mode="" />
                </view>
              </view>
            </view>
          </view>
        </view>

        <view v-show="!hotAndHistory" class="search-result">
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
export default {
  components: {
    shopItem,
  },
  data() {
    return {
      bgColor: '#f5f5f5',
      clearBtnShow: false, //是否显示清空按钮
      searchFocus: false, //是否获取焦点
      hotAndHistory: false, //是否显示历史和热门搜索
      searchValue: '',
      historySearchList: ['猪饲料', '鸡饲料', '保健品', '饲养设备 猪食槽'],
      hotSearchList: [
        { text: '生长猪浓缩饲料' },
        { text: '高档乳猪配合饲料' },
        { text: '黄羽肉鸡混合饲料' },
      ],
      shopList: [
        { src: shop1, name: '双胞胎种猪配合饲料40kg', price: '¥150' },
        { src: shop2, name: '双胞胎种猪配合饲料40kg', price: '¥150' },
        { src: shop2, name: '双胞胎种猪配合饲料40kg', price: '¥150' },
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
  .search-content {
    .hot-history {
      margin-top: 30rpx;
      .his {
        .his-title,
        .hot-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .text {
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
          }
          image {
            width: 34rpx;
            height: 36rpx;
          }
        }
        .his-content {
          .his-list {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .his-item {
              background: #ffffff;
              border-radius: 50rpx;
              font-size: 24rpx;
              font-weight: bold;
              color: #666666;
              padding: 14rpx 25rpx;
              margin: 30rpx 0rpx 0rpx 20rpx;
            }
          }
        }
      }
      .hot {
        margin-top: 30rpx;
        .hot-title {
          .text {
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
          }
        }
        .hot-content {
          .hot-list {
            margin-top: 30rpx;
            .hot-item {
              width: 100%;
              height: 60rpx;
              border-radius: 50rpx;
              background: #fff;
              margin-bottom: 20rpx;
              padding: 14rpx 20rpx 14rpx 30rpx;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .text {
                font-size: 24rpx;
                font-weight: bold;
                color: #ffa851;
              }
              image {
                width: 12rpx;
                height: 20rpx;
              }
            }
          }
        }
      }
    }
    .search-result {
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
