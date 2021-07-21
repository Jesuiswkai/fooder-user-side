<template>
  <app-page title="优惠券" :bgColor="bgColor" showNavbar>
    <view class="container">
      <view class="subsection">
        <u-subsection
          :list="list"
          :current="current"
          bgColor="#ffffff"
          buttonColor="#2EB232"
          active-color="#ffffff"
          inactive-color="#7D9B75"
          font-size="30"
          height="80"
          @change="changeCoupon"
        ></u-subsection>
      </view>

      <scroll-view
        v-show="isShow"
        style="width: 100%; height: 68vh"
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
              :class="item.lose == 1 ? 'lose' : ''"
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
            </view>
          </view>
        </lazy-list>
      </scroll-view>

      <view v-show="!isShow" class="no-data">
        <image src="@/static/coupon/coupon_nodata.png" mode="" />
        <text>暂无可领取优惠券</text>
      </view>
    </view>

    <view class="opera">
      <view class="btn-viwe">
        <button class="rule">使用规则</button>
        <button class="goto" @click="goto">抢更多好券</button>
      </view>
    </view>
  </app-page>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      triggered: false,
      bgColor: '#f5f5f5',
      list: [
        {
          name: '未使用',
        },
        {
          name: '已使用',
        },
        {
          name: '已失效',
        },
      ],
      current: 0,
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
    changeCoupon(index) {
      this.couponList.type = parseInt(index) + 1
      this.couponList.finished = false
      this.couponList.data = []
      this.couponList.page = 1
      this.loadData()
    },
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
      this.Api.user.getUserCouponList.do(data).then((res) => {
        this.couponList.loading = false
        this.triggered = false
        if (res.list.length != 0) {
          for (let item of res.list) {
            if (this.couponList.type != 1) {
              item.lose = 1
            }
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
    goto() {
      uni.navigateTo({
        url: '../couponDraw/couponDraw',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .u-subsection {
  font-weight: bold !important;
  border-radius: 40rpx !important;
  .u-item-bg {
    border-radius: 40rpx !important;
  }
}
.container::before {
  display: table;
  content: '';
}
.container {
  width: 690rpx;
  margin: 0 auto;
  font-family: 'PingFang SC';
  padding-bottom: 220rpx;
  .subsection {
    margin-top: 30rpx;
  }
  .content {
    margin-top: 30rpx;
    .coupon-list {
      width: 100%;
      height: 190rpx;
      background: url('@/static/coupon/coupon_bg.png') no-repeat;
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
    }
    .coupon-list.lose {
      background: url('@/static/coupon/coupon_lose_bg.png') no-repeat;
      background-size: 100% 100%;
      .coupon-price {
        view {
          color: #666666;
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

.opera {
  position: fixed;
  bottom: 0rpx;
  width: 100%;
  height: 178rpx;
  background: #fff;
  box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.15);
  .btn-viwe {
    width: 100%;
    height: 110rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      height: 70rpx;
      font-size: 24rpx;
      font-weight: bold;
      border-radius: 45rpx;
      padding: 0;
    }
    .rule {
      width: 140rpx;
      background: #f5f5f5;
      color: #666666;
    }
    .goto {
      width: 520rpx;
      background: #ffe1d6;
      color: #ff2424;
    }
  }
}
</style>