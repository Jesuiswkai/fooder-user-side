<template>
  <app-page isTabPage immersiveNav current="2">
    <view class="container">
      <view class="shopCart-top">
        <view></view>
        <view class="shopCart-title">购物车</view>
      </view>

      <view class="shopCart-content">
        <view class="shopCart-title">
          <view>已选择商品</view>
          <view>清空购物车</view>
        </view>

        <scroll-view
          scroll-y
          @scrolltolower="scrollToLower()"
          :refresher-enabled="isLogin"
          @refresherrefresh="refreshData()"
          :refresher-triggered="triggered"
        >
          <lazy-list
            v-model="shopList.loading"
            :list="shopList.data"
            :finished="shopList.finished"
            @load="loadData"
            proxy
            ref="lazyList"
            hideLoadmore
          >
            <view>
              <view
                class="shopCart-list"
                v-for="(item, index) in list"
                :key="item.id"
              >
                <u-swipe-action
                  class="shopCart-item"
                  :show="item.show"
                  :index="index"
                  @click="click"
                  @open="open"
                  :options="options"
                  bg-color="#f5f5f5"
                  btn-width="120"
                >
                  <view class="item-center">
                    <view
                      class="selector"
                      :class="item.action == 1 ? 'action' : ''"
                      @click="handleSelector(item)"
                    >
                      <view class="round">
                        <u-icon
                          v-if="item.action == 1"
                          name="checkmark"
                          color="#2EB232"
                          size="18"
                        ></u-icon>
                      </view>
                    </view>
                    <view class="img">
                      <image :src="item.images" mode="" />
                    </view>
                    <!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
                    <view class="title-wrap">
                      <text class="title u-line-2">{{ item.title }}</text>
                      <view class="addsub">
                        <text>¥{{ item.price }}</text>
                        <u-number-box
                          :min="1"
                          size="18"
                          input-height="35"
                          :disabled-input="true"
                          v-model="item.value"
                        ></u-number-box>
                      </view>
                    </view>
                  </view>
                </u-swipe-action>
              </view>
            </view>
          </lazy-list>
        </scroll-view>
      </view>
    </view>

    <view class="opera">
      <view class="left">
        <u-checkbox
          @change="checkboxChange"
          v-model="selectAll"
          shape="circle"
          icon-size="16"
          active-color="#2EB232"
          >全选</u-checkbox
        >
      </view>
      <view class="right">
        <view class="total">
          <text class="label">合计</text>
          <text class="price">¥{{ priceTotal }}</text>
        </view>
        <view class="btn">
          <button>立即下单</button>
        </view>
      </view>
    </view>
  </app-page>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      triggered: false,
      list: [
        {
          id: 1,
          action: 0,
          value: 1,
          price: '150',
          title:
            '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
          images: 'https://cdn.uviewui.com/uview/common/logo.png',
          show: false,
        },
        {
          id: 2,
          action: 0,
          value: 1,
          price: '200',
          title:
            '新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来',
          images: 'https://cdn.uviewui.com/uview/common/logo.png',
          show: false,
        },
        {
          id: 3,
          action: 0,
          value: 1,
          price: '500',
          title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
          images: 'https://cdn.uviewui.com/uview/common/logo.png',
          show: false,
        },
      ],
      selectAll: false, //是否全选
      priceTotal: 0, //合计金额
      disabled: false,
      btnWidth: 180,
      show: false,
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d',
          },
        },
      ],
    }
  },
  watch: {
    list: {
      handler(newValue, oldValue) {
        var data = newValue.filter(function (item) {
          return item.action == 1
        })
        let total = 0
        for (let item of data) {
          total += item.price * item.value
        }
        this.priceTotal = total
      },
      deep: true,
    },
  },
  methods: {
    click(index, index1) {
      if (index1 == 0) {
        this.list.splice(index, 1)
        this.$u.toast(`删除了第${index}个cell`)
      }
    },
    // 如果打开一个的时候，不需要关闭其他，则无需实现本方法
    open(index) {
      // 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
      // 原本为'false'，再次设置为'false'会无效
      this.list[index].show = true
      this.list.map((val, idx) => {
        if (index != idx) this.list[idx].show = false
      })
    },
    handleSelector(data) {
      data.action = data.action == 1 ? 0 : 1
      let actions = this.list.map((obj) => {
        return obj.action
      })
      if (!actions.includes(0)) {
        this.selectAll = true
      } else {
        this.selectAll = false
      }
    },
    checkboxChange(data) {
      for (let item of this.list) {
        if (data.value) {
          item.action = 1
        } else {
          item.action = 0
        }
      }
    },
    scrollToLower() {
      this.$refs['lazyList'].loadMore()
    },
    refreshData() {
      console.log('自定义下拉刷新被触发')
    },
    loadData() {
      console.log('lazy内load被触发')
      setTimeout(() => {
        // for (let i = 0; i < 3; i++) {
        //   this.shopList.data.push({
        //     src: shop2,
        //     name: '双胞胎种猪配合饲料80kg',
        //     price: '¥200',
        //   })
        // }
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 690rpx;
  margin: 0 auto;
  font-family: 'PingFang SC';
  .shopCart-top {
    :first-child {
      height: 88rpx;
    }
    .shopCart-title {
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
    }
  }
  .shopCart-content {
    margin-top: 53rpx;
    .shopCart-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      :first-child {
        font-size: 36rpx;
        font-weight: bold;
        color: #333333;
      }
      :last-child {
        font-size: 30rpx;
        font-weight: 400;
        color: #999999;
      }
    }
    .shopCart-list {
      height: 200rpx;
      margin-top: 30rpx;
      border-radius: 20rpx;
      .shopCart-item {
        .item-center {
          width: 690rpx;
          height: 200rpx;
          padding: 20rpx 20rpx 20rpx 17rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .selector {
            width: 38rpx;
            height: 160rpx;
            background: #f5f5f5;
            border-radius: 15rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            .round {
              width: 18rpx;
              height: 18rpx;
              background: #ffffff;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .selector.action {
            background: #2eb232;
          }
          .img {
            width: 160rpx;
            height: 160rpx;
            margin-left: 20rpx;
            image {
              width: 160rpx;
              height: 160rpx;
            }
          }
          .title-wrap {
            width: 428rpx;
            height: 160rpx;
            margin-left: 20rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .title {
              font-size: 24rpx;
              font-weight: bold;
              color: #333333;
            }
            .addsub {
              display: flex;
              justify-content: space-between;
              align-items: center;
              text {
                font-size: 24rpx;
                font-weight: bold;
                color: #ff2424;
              }
            }
          }
        }
      }
    }
  }
}

.opera {
  width: 690rpx;
  height: 100rpx;
  position: fixed;
  bottom: 55rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 130rpx;
    height: 100rpx;
    background: #ffffff;
    border-radius: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    ::v-deep .u-checkbox {
      .u-checkbox__icon-wrap {
        width: 22rpx !important;
        height: 22rpx !important;
      }
      .u-checkbox__label {
        margin: 0 !important;
        margin-left: 20rpx !important;
        font-size: 24rpx;
        font-weight: bold;
        color: #333333;
      }
    }
  }
  .right {
    width: 540rpx;
    height: 100rpx;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .total {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      font-weight: bold;
      .label {
        color: #333333;
      }
      .price {
        margin-left: 20rpx;
        color: #ff2424;
      }
    }
    .btn {
      button {
        width: 133rpx;
        height: 60rpx;
        border-radius: 15rpx;
        background: #2eb232;
        font-size: 24rpx;
        font-weight: bold;
        color: #ffffff;
        padding-left: 18rpx;
        padding-right: 18rpx;
      }
    }
  }
}

::v-deep .u-swipe-view {
  display: flex;
  justify-content: space-between;
}

::v-deep .u-swipe-content {
  background: #ffffff;
  border-radius: 20rpx !important;
}

::v-deep .u-swipe-del {
  width: 100rpx !important;
  margin-left: 20rpx !important;
  border-radius: 20rpx !important;
  background: #ffaeae !important;
  .u-btn-text {
    font-size: 24rpx !important;
    font-weight: bold !important;
    color: #ffffff !important;
  }
}

::v-deep .u-numberbox {
  .u-icon-minus,
  .u-icon-plus {
    width: 35rpx !important;
    border-radius: 10rpx !important;
    background: #4791ff !important;
  }
  .u-icon-minus,
  .u-icon-plus {
    text {
      color: #ffffff;
    }
  }
  .u-icon-disabled {
    background: #999999 !important;
  }
  .u-number-input {
    height: 35rpx !important;
    background: #ffffff !important;
  }
}
</style>
