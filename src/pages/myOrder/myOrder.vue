<template>
  <app-page title="我的订单" :bgColor="bgColor" showNavbar>
    <u-tabs
      :list="list"
      :current="current"
      bg-color="#f5f5f5"
      @change="change"
    ></u-tabs>

    <view class="container">
      <view class="card" v-for="(item, index) of orderList" :key="index">
        <view class="card-top">
          <view class="left">{{ item.createTime }}</view>
          <view class="right">
            <text v-if="item.status == 1" style="color: #ff2424"
              >未支付，请及时处理</text
            >
            <text v-else-if="item.status == 2" style="color: #24afff"
              >商品准备中</text
            >
            <text v-else-if="item.status == 3" style="color: #24afff"
              >商品配送中</text
            >
            <text v-else-if="item.status == 4" style="color: #98d288"
              >已完成</text
            >
            <text v-else style="color: #999999">已取消</text>
          </view>
        </view>
        <view class="card-center" @click="toDetail(item)">
          <view
            class="info-list"
            v-for="info of item.goods"
            :key="item.goodsId"
          >
            <image :src="info.goodsImg" mode="" />
            <view class="info">
              <view class="name">{{ info.goodsName }}</view>
              <view class="other">
                <text>¥{{ info.goodsPrice }}</text>
                <text>X{{ info.goodsNum }}包</text>
              </view>
            </view>
          </view>
        </view>
        <view class="card-bottom">
          <button class="cancel" v-if="item.status == 1">取消订单</button>
          <button class="confirm">
            <text v-if="item.status == 1">去付款</text>
            <text v-else-if="item.status == 2 || item.status == 3"
              >确认收货</text
            >
            <text v-else-if="item.status == 4">查看订单</text>
            <text v-else>再次购买</text>
          </button>
        </view>
      </view>
    </view>
  </app-page>
</template>

<script>
export default {
  data() {
    return {
      bgColor: '#f5f5f5',
      list: [
        {
          name: '全部',
          type: 0,
        },
        {
          name: '待付款',
          type: 1,
        },
        {
          name: '待配送',
          type: 2,
        },
        {
          name: '配送中',
          type: 3,
        },
        {
          name: '已完成',
          type: 4,
        },
        {
          name: '已取消',
          type: 5,
        },
      ],
      current: 0,
      orderList: [],
    }
  },
  mounted() {
    this.getMyOrderList()
  },
  methods: {
    change(index) {
      this.current = index
      this.getMyOrderList()
    },
    // 获取订单列表
    getMyOrderList() {
      this.Api.order.myOrderList
        .do({ status: this.current, page: 1, pageSize: 100 })
        .then((res) => {
          this.orderList = res.list
        })
    },
    // 去订单详情
    toDetail(data) {
      uni.navigateTo({
        url: '../orderDetail/orderDetail?orderNum=' + data.orderNum,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .u-tab-item {
  border-bottom: 6rpx solid #fff;
}

.container {
  padding: 30rpx;
  .card:not(:last-child) {
    margin-bottom: 30rpx;
  }
  .card {
    width: 690rpx;
    background: #ffffff;
    border-radius: 20px;
    .card-top {
      height: 73rpx;
      padding: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2rpx solid #f5f5f5;
      view {
        font-size: 24rpx;
        font-weight: 400;
        color: #999999;
      }
    }
    .card-center {
      padding: 0rpx 20rpx;
      .info-list:first-child {
        margin-top: 20rpx;
      }
      .info-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;
        image {
          width: 160rpx;
          height: 160rpx;
        }
        .info {
          width: 490rpx;
          height: 160rpx;
          margin-left: 20rpx;
          font-size: 24rpx;
          font-weight: bold;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name {
            color: #333333;
          }
          .other {
            display: flex;
            justify-content: space-between;
            align-items: center;
            :first-child {
              color: #ff2424;
            }
            :last-child {
              color: #666666;
            }
          }
        }
      }
    }
    .card-bottom {
      height: 90rpx;
      padding: 20rpx;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border-top: 2rpx solid #f5f5f5;
      button::after {
        display: none;
      }
      button {
        width: 154rpx;
        height: 50rpx;
        line-height: 50rpx;
        margin: 0rpx;
        border-radius: 30rpx;
        font-size: 24rpx;
        font-weight: bold;
        background: #2eb232;
        color: #ffffff;
      }
      .cancel {
        background: #e5e5e5;
        color: #666666;
      }
      .confirm {
        margin-left: 20rpx;
      }
    }
  }
}
</style>