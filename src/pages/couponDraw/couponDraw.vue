<template>
  <app-page title="优惠券" :bgColor="bgColor" showNavbar>
    <view class="container">
      <scroll-view
        v-show="isShow"
        style="width: 100%; height: 88vh"
        scroll-y
        @scrolltolower="scrollToLower()"
        :refresher-enabled="isLogin"
        @refresherrefresh="refreshData()"
        :refresher-triggered="triggered"
      >
        <lazy-list
          v-model="couponList.loading"
          :list="couponList.data"
          :finished="couponList.finished"
          @load="loadData"
          proxy
          ref="lazyList"
          hideLoadmore
        >
          <view class="content">
            <view
              class="coupon-list"
              v-for="(item, index) of couponList.data"
              :key="index"
            >
              <view class="coupon-price">
                <view>¥{{ item.money }}</view>
                <view>满{{ item.priceConditionString }}可用</view>
              </view>
              <view class="coupon-info">
                <view>{{ item.name }}</view>
                <view>有效期{{ item.startTime }}至{{ item.endTime }}</view>
              </view>
              <view class="coupon-opera">
                <button
                  class="draw"
                  v-if="item.isReceive == 0"
                  @click="drawNow(item)"
                >
                  立即领取
                </button>
                <button class="goto" v-else @click="goto">去使用</button>
              </view>
            </view>
          </view>
        </lazy-list>
      </scroll-view>
      <view v-show="!isShow" class="no-data">
        <image
          src="https://slmall.oss-cn-beijing.aliyuncs.com/web/coupon/coupon_nodata.png"
          mode=""
        />
        <text>暂无可领取优惠券</text>
      </view>
    </view>
  </app-page>
</template>

<script>
export default {
  data() {
    return {
      bgColor: '#f5f5f5',
      isLogin: true,
      triggered: false,
      couponList: {
        loading: false,
        finished: false,
        page: 1,
        pageSize: 10,
        type: 1,
        data: [],
      },
      isShow: true,
    }
  },
  onShow() {
    this.loadData()
  },
  methods: {
    scrollToLower() {
      this.couponList.page += 1
      this.$refs['lazyList'].loadMore()
    },
    refreshData() {
      if (!this.triggered) {
        this.triggered = true
      }
      this.couponList.page = 1
      this.couponList.data = []
      this.loadData()
    },
    loadData() {
      this.couponList.loading = true
      const data = {
        page: this.couponList.page,
        pageSize: this.couponList.pageSize,
        type: this.couponList.type,
      }
      if (this.couponList.finished) {
        return
      }
      this.Api.user.getCouponList.do(data).then((res) => {
        this.couponList.loading = false
        this.triggered = false
        if (res.list.length != 0) {
          for (let item of res.list) {
            this.couponList.data.push(item)
          }
        } else {
          if (data.page == 1) {
            this.isShow = false
          }
          this.couponList.finished = true
        }
      })
    },
    drawNow(item) {
      this.Api.user.saveCoupon.do({ couponId: item.id }).then((res) => {
        item.isReceive = 1
      })
    },
    goto() {
      uni.switchTab({
        url: '../classification/classification',
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
  margin: 0 auto;
  font-family: 'PingFang SC';
  .subsection {
    margin-top: 30rpx;
  }
  .content {
    margin-top: 30rpx;
    .coupon-list {
      width: 100%;
      height: 190rpx;
      background: url('https://slmall.oss-cn-beijing.aliyuncs.com/web/coupon/coupon_bg.png')
        no-repeat;
      background-size: 100% 100%;
      position: relative;
      margin-bottom: 30rpx;
      .coupon-price {
        position: absolute;
        top: 50%;
        left: 43rpx;
        transform: translateY(-50%);
        :first-child {
          font-size: 36rpx;
          font-family: 'HelveticaNeue LT 95';
          font-weight: 900;
          color: #ff6a6a;
        }
        :last-child {
          font-size: 24rpx;
          font-family: 'PingFang SC';
          font-weight: bold;
          color: #666666;
          margin-top: 15rpx;
        }
      }
      .coupon-info {
        color: #333333;
        position: absolute;
        top: 50%;
        left: 248rpx;
        transform: translateY(-50%);
        :first-child {
          font-size: 30rpx;
          font-weight: bold;
        }
        :last-child {
          font-size: 24rpx;
          font-weight: 400;
          margin-top: 15rpx;
        }
      }
      .coupon-opera {
        position: absolute;
        top: 20rpx;
        right: 20rpx;
        button {
          width: 120rpx;
          height: 50rpx;
          line-height: 50rpx;
          padding: 0;
          border-radius: 15rpx;
          color: #ffffff;
          font-size: 24rpx;
          font-weight: bold;
        }
        .draw {
          background: #24afff;
        }
        .goto {
          background: #2eb232;
        }
      }
    }
  }
  .no-data {
    margin-top: 140rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    image {
      width: 300rpx;
      height: 300rpx;
    }
    text {
      margin-top: 50rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #999999;
    }
  }
}
</style>