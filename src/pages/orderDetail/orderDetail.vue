<template>
  <app-page title="订单详情" :bgColor="bgColor" showNavbar>
    <view class="container">
      <view
        class="top"
        :class="
          orderInfo.status == 1
            ? 'waiting'
            : orderInfo.status == 2 || orderInfo.status == 3
            ? 'transit'
            : orderInfo.status == 4
            ? 'complete'
            : orderInfo.status == 5
            ? 'cancel'
            : ''
        "
      >
        <view
          class="title"
          :style="{ 'margin-top': orderInfo.status == 4 ? '85rpx' : '' }"
          >{{
            orderInfo.status == 1
              ? '待付款'
              : orderInfo.status == 2
              ? '待配送'
              : orderInfo.status == 3
              ? '配送中'
              : orderInfo.status == 4
              ? '已完成'
              : orderInfo.status == 5
              ? '已取消'
              : ''
          }}</view
        >
        <view class="text">{{
          orderInfo.status == 1
            ? '未支付，请及时处理'
            : orderInfo.status == 2
            ? '商品准备中'
            : orderInfo.status == 3
            ? '商品配送中'
            : orderInfo.status == 4
            ? ''
            : orderInfo.status == 5
            ? '未支付，交易关闭'
            : ''
        }}</view>
      </view>

      <!--配送方式-->
      <view class="transport-type">
        <view class="key">配送方式</view>
        <view class="value">{{
          orderInfo.pickWay == 1 ? '门店自提' : '线上配送'
        }}</view>
      </view>

      <!--接收人-->
      <view class="receiveRen">
        <!--线上-->
        <view class="online" v-if="orderInfo.pickWay == 2">
          <view class="info">
            <view>{{ orderInfo.consignee }}</view>
            <view>{{ orderInfo.contactNumber }}</view>
          </view>
          <view class="address">{{ orderInfo.detailAddress }}</view>
        </view>
        <!--线下-->
        <view class="underline" v-else>
          <view>{{ orderInfo.selfName }}</view>
          <view>{{ orderInfo.selfPhone }}</view>
        </view>
      </view>

      <!--提货点-->
      <view class="pickup-address" v-if="orderInfo.pickWay == 1">
        <view>提货点：{{ orderInfo.providersDto.name }}</view>
        <view>{{ orderInfo.providersDto.addressDetail }}</view>
      </view>

      <!--时间-->
      <view class="time">
        <!--期望配送时间-->
        <view class="transport-time" v-if="orderInfo.pickWay == 2">
          <view>期望配送时间</view>
          <view>{{ orderInfo.expectTime }}</view>
        </view>
        <!--预计自提时间-->
        <view class="self-time" v-else>
          <view>预计自提时间</view>
          <view>{{ orderInfo.expectTime }}</view>
        </view>
      </view>

      <!--商品列表-->
      <view class="product-list">
        <view
          class="card"
          v-for="(item, index) of orderInfo.goods"
          :key="index"
        >
          <image :src="item.goodsImg" mode="" />
          <view class="info">
            <view class="name">{{ item.goodsName }}</view>
            <view class="other">
              <text>¥{{ item.goodsPrice }}</text>
              <text>X{{ item.goodsNum }}包</text>
            </view>
          </view>
        </view>
      </view>

      <!--订单详情项-->
      <view class="order-item">
        <view
          class="line-info"
          v-for="(item, index) of orderInfo.orderList"
          :key="index"
        >
          <view class="key">{{ item.key }}</view>
          <view class="value" :class="item.orange == 1 ? 'orange' : ''">{{
            item.value
          }}</view>
        </view>
      </view>

      <!--备注-->
      <view class="remark">
        <view class="title">备注</view>
        <view class="content">{{ orderInfo.remark }}</view>
      </view>

      <!--额外信息-->
      <view class="extra-info">
        <!--配送中-线上-->
        <view
          class="transport-online"
          v-if="orderInfo.pickWay == 2 && orderInfo.status == 3"
        >
          <view class="title">配送员</view>
          <view class="personnel">
            <view class="name">陈锐</view>
            <view class="phone">18002334272</view>
          </view>
        </view>
        <!--已完成-线上-->
        <view
          class="completed-online"
          v-if="orderInfo.pickWay == 2 && orderInfo.status == 4"
        >
          <view class="title">配送员</view>
          <view class="personnel">
            <view class="name">陈锐</view>
            <view class="phone">18002334272</view>
          </view>
          <view class="title">送达时间</view>
          <view>{{ orderInfo.completeTime }}</view>
        </view>
        <!--已完成-线下-->
        <view
          class="completed-underline"
          v-if="orderInfo.pickWay == 1 && orderInfo.status == 4"
        >
          <view class="title">送达时间</view>
          <view>{{ orderInfo.completeTime }}</view>
        </view>
        <!--已取消-后台-->
        <view class="canceled-underline" v-if="orderInfo.status == 5">
          <view class="personnel">
            <view class="name">取消类型</view>
            <view class="phone">{{
              orderInfo.cancelType == 1 ? '用户取消' : '平台取消'
            }}</view>
          </view>
          <view class="personnel" style="margin-top: 20rpx">
            <view class="name">取消时间</view>
            <view class="phone">{{ orderInfo.cancelTime }}</view>
          </view>
          <view class="personnel" style="margin-top: 20rpx">
            <view class="name">退款金额</view>
            <view class="phone">¥{{ orderInfo.cancelAmount }}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="opera">
      <view class="opera-btn">
        <view class="waiting" v-if="orderInfo.status == 1">
          <button class="cancelOrder">取消订单</button>
          <button class="toPay">去付款</button>
        </view>
        <view
          class="transport"
          v-else-if="orderInfo.status == 2 || orderInfo.status == 3"
        >
          <button class="completeReceipt">确认收货</button>
        </view>
        <view
          class="complete"
          v-else-if="orderInfo.status == 4 || orderInfo.status == 5"
        >
          <button class="buyAgain">再次购买</button>
        </view>
      </view>
    </view>
  </app-page>
</template>

<script>
import waiting from '@/static/order/waiting.png'
export default {
  data() {
    return {
      bgColor: '#f5f5f5',
      orderInfo: {
        pickWay: 1, //1:自提 2:配送
        status: '', //1: 待付款 2: 待配送 3: 配送中 4: 已完成 5: 已取消
        goods: [],
        orderList: [
          { code: 'orderNum', key: '订单编号', value: '', orange: 0 },
          {
            code: 'createTime',
            key: '订单时间',
            value: '',
            orange: 0,
          },
          { code: 'amount', key: '商品总额', value: '', orange: 0 },
          {
            code: 'conponAmount',
            key: '优惠券',
            value: '',
            orange: 1,
          },
          {
            code: 'actualAmount',
            key: '实付金额',
            value: '',
            orange: 0,
          },
        ],
        consignee: '', //收货人姓名
        contactNumber: '', //收货人电话
        detailAddress: '', //详细地址
        selfName: '', //自提人姓名
        selfPhone: '', //自提人电话
        remark: '', //备注
        expectTime: '', //期望配送时间/预计自提时间
        completeTime: '', //自提/配送完成时间
        payTime: '', //支付时间
        cancelType: '', //取消类型 1:用户  2:平台
        cancelTime: '', //取消时间
        cancelAmount: '', //取消金额
        list: {}, //配送员信息
        providersDto: {
          //服务商信息
          name: '',
          addressDetail: '',
        },
      },
    }
  },
  onLoad(data) {
    this.getOrderDetail(data.orderNum)
  },
  mounted() {},
  methods: {
    getOrderDetail(orderNum) {
      this.Api.order.myOrderDetail.do({ orderNum: orderNum }).then((res) => {
        for (let obj in this.orderInfo) {
          if (obj != 'orderList') {
            this.orderInfo[obj] = res[obj]
          }
        }
        for (let item of this.orderInfo.orderList) {
          if (item.code == 'amount' || item.code == 'actualAmount') {
            item.value = '¥' + res[item.code]
          } else if (item.code == 'conponAmount') {
            item.value = '- ¥' + res[item.code]
          } else {
            item.value = res[item.code]
          }
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 690rpx;
  margin: 0 auto;
  margin-top: 10rpx;
  padding-bottom: 220rpx;
  .top::before {
    display: table;
    content: '';
  }
  .top {
    width: 690rpx;
    height: 220rpx;
    border-radius: 20rpx;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .title {
      font-size: 36rpx;
      font-weight: bold;
      margin-top: 50rpx;
      text-align: center;
    }
    .text {
      font-size: 24rpx;
      font-weight: 400;
      color: #666666;
      margin-top: 30rpx;
      text-align: center;
    }
  }
  .top.waiting {
    background-image: url('@/static/order/waiting.png');
    .title {
      color: #ff2424;
    }
  }
  .top.transit {
    background-image: url('@/static/order/transit.png');
    .title {
      color: #24afff;
    }
  }
  .top.complete {
    background-image: url('@/static/order/complete.png');
    .title {
      color: #2eb232;
    }
  }
  .top.cancel {
    background-image: url('@/static/order/cancel.png');
    .title {
      color: #666666;
    }
  }
  .transport-type {
    padding: 24rpx 20rpx;
    margin-top: 30rpx;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 20rpx;
    view {
      font-size: 30rpx;
      font-weight: bold;
    }
    .key {
      color: #333333;
    }
    .value {
      color: #2eb232;
    }
  }
  .receiveRen {
    padding: 24rpx 20rpx;
    margin-top: 30rpx;
    background: #fff;
    border-radius: 20rpx;
    .online {
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .address {
        margin-top: 20rpx;
        color: #666;
      }
    }
    .underline {
      display: flex;
      justify-content: space-between;
      align-items: center;
      view {
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
      }
    }
  }
  .pickup-address {
    padding: 20rpx;
    margin-top: 30rpx;
    background: #fff;
    border-radius: 20rpx;
    font-size: 30rpx;
    font-weight: bold;
    :first-child {
      color: #333;
    }
    :last-child {
      color: #666;
      margin-top: 20rpx;
    }
  }
  .time {
    padding: 24rpx 20rpx;
    margin-top: 30rpx;
    background: #fff;
    border-radius: 20rpx;
    .transport-time,
    .self-time {
      font-size: 30rpx;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
      :first-child {
        color: #333;
      }
      :last-child {
        color: #666;
      }
    }
  }
  .product-list {
    .card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      padding: 20rpx;
      margin-top: 30rpx;
      border-radius: 20rpx;
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
          text:first-child {
            color: #ff2424;
          }
          text:last-child {
            color: #666666;
          }
        }
      }
    }
  }
  .order-item {
    margin-top: 30rpx;
    background: #fff;
    padding: 20rpx;
    border-radius: 20rpx;
    .line-info:not(:first-child) {
      margin-top: 20rpx;
    }
    .line-info {
      font-size: 24rpx;
      font-weight: bold;
      color: #333333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .value.orange {
        color: #ff7539;
      }
    }
  }
  .remark {
    background: #ffffff;
    border-radius: 20rpx;
    margin-top: 20rpx;
    padding: 10rpx 20rpx;
    display: flex;
    align-items: center;
    .title {
      height: 100%;
      padding-right: 20rpx;
      border-right: 2rpx solid #e5e5e5;
      font-size: 24rpx;
      font-weight: bold;
      color: #333333;
    }
    .content {
      width: 560rpx;
      padding: 14rpx 0rpx;
      margin-left: 20rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #666666;
    }
  }
  .extra-info {
    background: #ffffff;
    margin-top: 20rpx;
    border-radius: 20rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #333333;
    .title {
      color: #666666;
      margin-bottom: 20rpx;
    }
    .title + view:not(:last-child) {
      margin-bottom: 20rpx;
    }
    .personnel {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .transport-online,
    .completed-online,
    .completed-underline,
    .canceled-underline {
      padding: 20rpx;
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
  .opera-btn {
    width: 100%;
    height: 110rpx;
    padding: 20rpx 30rpx 0rpx 30rpx;
    button {
      height: 70rpx;
      line-height: 70rpx;
      background: #2eb232;
      border-radius: 45rpx;
      font-size: 24rpx;
      font-weight: bold;
      color: #ffffff;
      margin: 0rpx;
    }
    .waiting {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cancelOrder {
        width: 220rpx;
        background: #e5e5e5;
        color: #666666;
      }
      .toPay {
        width: 220rpx;
      }
    }
    .transport,
    .complete {
      display: flex;
      justify-content: center;
      align-items: center;
      .completeReceipt,
      .buyAgain {
        width: 440rpx;
      }
    }
  }
}
</style>