<template>
  <app-page title="搜索" showNavbar :bgColor="bgColor">
    <view class="container">
      <view class="search-input">
        <image class="search-img" src="@/static/public/search.png" mode="" />
        <input
          v-model="shopList.name"
          :focus="searchFocus"
          type="text"
          placeholder="输入关键词搜索"
          confirm-type="search"
        />
        <view class="operation">
          <image
            v-show="clearBtnShow"
            class="search-clear"
            src="@/static/public/clear.png"
            mode=""
            @click="clearSearch"
            @confirm="resetSearch"
          />
          <button size="mini" @click="resetSearch">搜索</button>
        </view>
      </view>

      <scroll-view
        style="width: 100%; height: 82vh"
        scroll-y
        @scrolltolower="scrollToLower()"
        :refresher-enabled="isLogin"
        @refresherrefresh="refreshData()"
        :refresher-triggered="triggered"
      >
        <view class="search-content">
          <!--搜索历史&热门搜索-->
          <view v-show="hotAndHistory" class="hot-history">
            <!--搜索历史-->
            <view class="his">
              <view class="his-title">
                <view class="text">搜索历史</view>
                <image
                  src="@/static/public/trash.png"
                  mode=""
                  @click="emptyHis"
                />
              </view>
              <view class="his-content">
                <view class="his-list">
                  <view
                    class="his-item"
                    v-for="(item, index) of historySearchList"
                    :key="index"
                    @click="hotAndHisSearch(item)"
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
                    @click="hotAndHisSearch(item.text)"
                  >
                    <view class="text">{{ item.text }}</view>
                    <image src="@/static/public/right.png" mode="" />
                  </view>
                </view>
              </view>
            </view>
          </view>

          <view v-show="!hotAndHistory" class="search-result">
            <lazy-list
              v-model="shopList.loading"
              :list="shopList.data"
              :finished="shopList.finished"
              @load="search"
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
          </view>
        </view>
      </scroll-view>
    </view>

    <u-modal
      v-model="modalData.show"
      :content="modalData.content"
      show-cancel-button
      :show-title="false"
      @confirm="confirmEmpty"
    ></u-modal>
  </app-page>
</template>

<script>
import shopItem from '@/components/ShopItem/index.vue'
import { mapState } from 'vuex'
export default {
  components: {
    shopItem,
  },
  data() {
    return {
      isLogin: false,
      triggered: false,
      bgColor: '#f5f5f5',
      clearBtnShow: false, //是否显示清空按钮
      searchFocus: false, //是否获取焦点
      hotAndHistory: true, //是否显示历史和热门搜索
      hotSearchList: [],
      shopList: {
        loading: false,
        finished: true,
        name: '',
        page: 1,
        pageSize: 3,
        data: [],
      },
      modalData: {
        show: false,
        content: '确认删除全部历史记录？',
      },
    }
  },
  computed: {
    ...mapState({
      historySearchList: (state) => state.other.searchHistory,
    }),
  },
  watch: {
    'shopList.name': {
      handler(newVal, oldVal) {
        if (newVal != '') {
          this.clearBtnShow = true //清空按钮显示
          this.hotAndHistory = false //搜索历史显示
          this.isLogin = true //下拉刷新开启
          this.shopList.finished = false //下拉不请求
        } else {
          this.clearBtnShow = false
          this.hotAndHistory = true
          this.isLogin = false
          this.shopList.finished = true
          this.shopList.data = []
        }
      },
    },
  },
  onShow() {
    this.hotWordsList()
  },
  methods: {
    clearSearch() {
      this.shopList.name = ''
      this.searchFocus = true
    },
    getShopInfo(data) {
      console.log(data)
    },
    emptyHis() {
      this.modalData.show = true
    },
    confirmEmpty() {
      this.$store.commit('other/emptySh')
    },
    //获取热门搜索
    hotWordsList() {
      this.Api.product.hotWordsList.do().then((res) => {
        for (let item of res) {
          let obj = {}
          obj.text = item
          this.hotSearchList.push(obj)
        }
      })
    },
    //点击热门和历史搜索
    hotAndHisSearch(name) {
      this.shopList.name = name
      this.shopList.page = 1
      this.shopList.finished = false
      this.search()
    },
    scrollToLower() {
      this.shopList.page += 1
      this.$refs['lazyList'].loadMore()
    },
    refreshData() {
      this.triggered = true
      this.shopList.page = 1
      this.shopList.data = []
    },
    resetSearch() {
      this.shopList.finished = false
      this.shopList.page = 1
      this.shopList.data = []
      this.search()
    },
    search() {
      this.shopList.loading = true
      const data = {
        name: this.shopList.name,
        page: this.shopList.page,
        pageSize: this.shopList.pageSize,
      }
      console.log(this.shopList.finished)
      if (this.shopList.finished || data.name == '') {
        this.shopList.loading = false
        return
      }
      this.Api.product.getGoodsListByName.do(data).then((res) => {
        this.pageLoading = false
        this.shopList.loading = false
        this.$store.commit('other/setsh', data.name)
        console.log(this.$store.getters['other/getsh'])
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
.container::before {
  display: table;
  content: '';
}
.container {
  width: 690rpx;
  height: 100%;
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
