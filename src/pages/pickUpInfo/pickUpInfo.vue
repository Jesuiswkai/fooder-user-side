<template>
  <app-page title="提货信息" :bgColor="bgColor" showNavbar>
    <view class="container">
      <scroll-view
        v-show="isShow"
        style="width: 100%; height: 74vh"
        scroll-y
        @scrolltolower="scrollToLower()"
        :refresher-enabled="isLogin"
        @refresherrefresh="refreshData()"
        :refresher-triggered="triggered"
      >
        <lazy-list
          v-model="cardList.loading"
          :list="cardList.data"
          :finished="cardList.finished"
          @load="loadData"
          proxy
          ref="lazyList"
          hideLoadmore
        >
          <view class="cards">
            <view class="card" v-for="(item, index) of cardList.data">
              <view class="info" @click="updateAddress(item)">
                <view class="personal">
                  <view class="name">{{ item.userName }}</view>
                  <view class="phone-and-img">
                    <view class="phone">{{ item.phone }}</view>
                    <image src="@/static/public/right.png" mode="" />
                  </view>
                </view>
                <view class="address">{{ item.detail }}</view>
              </view>
              <view class="card-opera">
                <view
                  class="default-address"
                  :class="item.isDefault ? 'action' : ''"
                >
                  <text>默认地址</text>
                  <u-switch
                    v-model="item.isDefault"
                    size="30"
                    active-color="#fff"
                    @change="change(item)"
                  ></u-switch>
                </view>
                <view class="remove" @click="removeAddress(item, index)"
                  >删除</view
                >
              </view>
            </view>
          </view>
        </lazy-list>
      </scroll-view>

      <view v-show="!isShow" class="no-data">
        <image src="@/static/public/placeholder.png" mode="" />
        <text>暂无数据</text>
      </view>
    </view>

    <view class="opera">
      <button @click="receiptAddress">添加收货地址</button>
    </view>
    <u-modal
      v-model="removeModal"
      content="确定要删除改地址吗"
      :show-title="false"
      @confirm="removeConfirm"
      show-cancel-button
    ></u-modal>
  </app-page>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      triggered: false,
      bgColor: '#f5f5f5',
      cardList: {
        loading: false,
        finished: false,
        page: 1,
        pageSize: 10,
        data: [],
      },
      isShow: true,
      removeModal: false,
      temporarilyData: null,
    }
  },
  onShow() {
    this.cardList.data = []
    this.loadData()
  },
  methods: {
    // 设置默认地址
    change(data) {
      if (data.isDefault) {
        data.isDefault = 1
        this.Api.user.updateUserAddress.do(data).then((res) => {
          for (let item of this.cardList.data) {
            if (item.id != data.id) {
              item.isDefault = false
            }
          }
        })
      } else {
        data.isDefault = 0
        this.Api.user.updateUserAddress.do(data).then((res) => {})
      }
    },
    // 添加地址
    receiptAddress() {
      uni.navigateTo({
        url: '../pickUpInfoUpdate/pickUpInfoUpdate',
      })
    },
    // 修改地址
    updateAddress(item) {
      uni.navigateTo({
        url: '../pickUpInfoUpdate/pickUpInfoUpdate?id=' + item.id,
      })
    },
    // 删除地址
    removeAddress(item, index) {
      this.removeModal = true
      this.temporarilyData = {
        item: item,
        index: index,
      }
    },
    removeConfirm() {
      this.Api.user.deleteUserAddress
        .do([this.temporarilyData.item.id])
        .then((res) => {
          uni.showToast({
            title: '删除成功',
            icon: 'none',
            duration: 2000,
          })
          this.cardList.data.splice(this.temporarilyData.index, 1)
        })
    },
    scrollToLower() {
      this.cardList.page += 1
      this.$refs['lazyList'].loadMore()
    },
    refreshData() {
      if (!this.triggered) {
        this.triggered = true
      }
      this.cardList.page = 1
      this.cardList.data = []
      this.cardList.finished = false
      this.loadData()
    },
    loadData() {
      this.cardList.loading = true
      const data = {
        page: this.cardList.page,
        pageSize: this.cardList.pageSize,
        type: this.cardList.type,
      }
      if (this.cardList.finished) {
        return
      }
      this.Api.user.getUserAddressList.do(data).then((res) => {
        this.cardList.loading = false
        this.triggered = false
        if (res.list.length != 0) {
          for (let item of res.list) {
            if (this.cardList.type != 1) {
              item.lose = 1
            }
            this.cardList.data.push(item)
          }
        } else {
          if (data.page == 1) {
            this.isShow = false
          }
          this.cardList.finished = true
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .u-switch {
  .u-switch__node {
    width: 28rpx !important;
    height: 28rpx !important;
    background: #cccccc;
  }
}
::v-deep .u-switch--on {
  .u-switch__node {
    background: #9dd98d !important;
  }
}
.container {
  width: 690rpx;
  margin: 0 auto;
  margin-top: 30rpx;
  padding-bottom: 220rpx;
  .card:not(:last-child) {
    margin-bottom: 30rpx;
  }
  .cards {
    padding-bottom: 20rpx;
    .card {
      width: 690rpx;
      height: 276rpx;
      background: #fff;
      border-radius: 20rpx;
      .info {
        height: 164rpx;
        border-bottom: 2rpx solid #f5f5f5;
        padding: 30rpx;
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
        .personal {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .phone-and-img {
            display: flex;
            align-items: center;
            image {
              margin-left: 60rpx;
              width: 12rpx;
              height: 20rpx;
            }
          }
        }
        .address {
          margin-top: 20rpx;
          color: #666666;
        }
      }
      .card-opera {
        height: 110rpx;
        padding: 30rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24rpx;
        font-weight: bold;
        color: #ffffff;
        .default-address.action {
          background: #9dd98d;
        }
        .default-address {
          width: 202rpx;
          height: 50rpx;
          background: #cccccc;
          border-radius: 25rpx;
          padding: 0rpx 12rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .remove {
          width: 120rpx;
          height: 50rpx;
          line-height: 50rpx;
          background: #ffaeae;
          border-radius: 25rpx;
          text-align: center;
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
  button {
    width: 690rpx;
    height: 70rpx;
    margin-top: 20rpx;
    line-height: 70rpx;
    background: #2eb232;
    border-radius: 45rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>