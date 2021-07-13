<template>
  <app-page title="确认下单" :bgColor="bgColor" showNavbar>
    <view class="container">
      <!--选择服务商-->
      <view class="service">
        <view class="service-title">
          <view class="text">选择服务商</view>
          <button class="btn">更换</button>
        </view>

        <view class="service-content">
          <service-item :obj="obj"></service-item>
        </view>
      </view>

      <!--选择配送方式-->
      <view class="distribute">
        <view class="distribute-title">
          <view class="text">选择配送方式</view>
        </view>

        <view class="distribute-content">
          <view class="tab">
            <view class="fixed">门店自提</view>
            <view class="mobile">线上配送</view>
          </view>
          <view class="center"></view>
        </view>
      </view>

      <!--订单详情-->
      <view class="order">
        <view class="order-title">
          <view class="text">订单详情</view>
        </view>

        <view class="order-content">
          <view class="order-info">
            <shop-order :obj="shopObj"></shop-order>
            <view style="margin-top: 20rpx">
              <shop-list :list="shopList"></shop-list>
            </view>
            <view class="coupon">
              <view class="name">优惠券</view>
              <view class="info">
                <view class="price">
                  <text>-</text>
                  <text>¥</text>
                  <text>10.00</text>
                </view>
                <image src="@/static/public/right.png" mode="" />
              </view>
            </view>
            <view class="remark">
              <view class="remark-title">备注</view>
              <view class="remark-input">
                <input type="text" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="opera">
      <view class="opera-btn">
        <view class="price">
          <text class="key">待支付：</text>
          <text class="value">¥130.00</text>
        </view>
        <button class="pay">立即下单</button>
      </view>
    </view>

    <u-modal
      title="提货信息选择"
      class="modal"
      width="690"
      v-model="modalData.show"
      :show-confirm-button="false"
    >
      <scroll-view class="modal-content" scroll-y>
        <view class="underline" v-if="modalData.type == 1">
          <view
            class="list"
            :class="item.action == 1 ? 'action' : ''"
            v-for="(item, index) of modalData.underlineList"
            :key="index"
            @click="selectPick(item)"
          >
            <view class="name">{{ item.name }}</view>
            <view class="info">
              <view class="phone">{{ item.phone }}</view>
              <view class="img" @click.stop="toPickUp">
                <image src="@/static/public/right.png" mode="" />
              </view>
            </view>
          </view>

          <view class="add">新增信息</view>
        </view>

        <view class="online" v-else>
          <view class="list"></view>
          <view class="add">新增信息</view>
        </view>
      </scroll-view>
      <view class="modal-btn">
        <button class="cancel" @click="cancel">取消</button>
        <button class="confirm">确定</button>
      </view>
    </u-modal>
  </app-page>
</template>

<script>
import serviceItem from '@/components/ServiceItem/index.vue'
import shopOrder from '@/components/ShopOrder/index.vue'
import shopList from '@/components/ShopList/index.vue'
import shop1 from '@/static/index/shop1.png'
export default {
  components: {
    serviceItem,
    shopOrder,
    shopList,
  },
  data() {
    return {
      bgColor: '#f5f5f5',
      obj: {
        img: shop1,
        name: '西普6号',
        default: 1,
        distance: '2.80',
        address:
          '重庆市渝中区纯阳洞5号重庆市渝中区纯阳洞5号重庆市渝中区纯阳洞5号',
      },
      shopObj: {
        url: shop1,
        name: '双胞胎种猪配合饲料40kg',
        price: '¥150',
        specs: 'X1包',
      },
      shopList: [
        { name: '商品金额', price: '150.00', orange: 0, minus: 0 },
        { name: '自提优惠', price: '150.00', orange: 1, minus: 1 },
      ],
      modalData: {
        show: false,
        type: 2,
        underlineList: [
          { name: '陈锐', phone: '17623563437', action: 1 },
          { name: '陈锐', phone: '17623563437' },
          { name: '陈锐', phone: '17623563437' },
          { name: '陈锐', phone: '17623563437' },
          { name: '陈锐', phone: '17623563437' },
          { name: '陈锐', phone: '17623563437' },
        ],
      },
    }
  },
  methods: {
    cancel() {
      this.modalData.show = false
    },
    toPickUp() {
      console.log(1)
    },
    selectPick(data) {
      for (let item of this.modalData.underlineList) {
        if (item.action == 1) {
          item.action = 0
        }
      }
      this.$set(data, 'action', 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 690rpx;
  margin: 0 auto;
  margin-top: 30rpx;
  font-family: 'PingFang SC';
  padding-bottom: 220rpx;
  .service {
    .service-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        font-size: 36rpx;
        font-weight: bold;
        color: #333333;
      }
      .btn {
        width: 120rpx;
        height: 50rpx;
        line-height: 50rpx;
        background: #2eb232;
        border-radius: 20rpx;
        font-size: 24rpx;
        font-weight: bold;
        color: #ffffff;
        margin: 0;
      }
    }
    .service-content {
      margin-top: 30rpx;
    }
  }
  .distribute {
    .distribute-title {
      .text {
        font-size: 36rpx;
        font-weight: bold;
        color: #333333;
      }
    }
    .distribute-content {
      width: 100%;
      border-radius: 20rpx;
      overflow: hidden;
      margin-top: 30rpx;
      .tab {
        width: 100%;
        height: 80rpx;
        background: #dceed8;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .fixed,
        .mobile {
          width: 50%;
          height: 100%;
          line-height: 80rpx;
          text-align: center;
          color: #7d9b75;
          font-size: 30rpx;
          font-weight: bold;
        }
      }
      .center {
        padding: 20rpx;
        background: #fff;
      }
    }
  }
  .order-title {
    margin-top: 30rpx;
    .text {
      font-size: 36rpx;
      font-weight: bold;
      color: #333333;
    }
  }
  .order-content {
    margin-top: 30rpx;
    .order-info {
    }
    .coupon {
      margin-top: 20rpx;
      padding: 20rpx;
      border-radius: 20rpx;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        font-size: 24rpx;
        font-weight: bold;
        color: #333333;
      }
      .info {
        display: flex;
        align-items: center;
        .price {
          font-size: 24rpx;
          font-weight: bold;
          color: #ff7539;
        }
        image {
          width: 12rpx;
          height: 20rpx;
          margin-left: 20rpx;
        }
      }
    }
    .remark {
      padding: 10rpx 20rpx;
      background: #fff;
      margin-top: 20rpx;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      .remark-title {
        width: 72rpx;
        height: 100%;
        padding-right: 20rpx;
        border-right: 1px solid #e5e5e5;
        font-size: 24rpx;
        font-weight: bold;
        color: #333333;
      }
      .remark-input {
        width: 560rpx;
        padding: 0rpx 20rpx;
      }
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
    padding: 0rpx 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .price {
      .key {
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
      }
      .value {
        margin-left: 10rpx;
        font-size: 38rpx;
        font-family: 'HelveticaNeue LT 95';
        font-weight: 900;
        color: #ff2424;
      }
    }
    button {
      width: 220rpx;
      height: 70rpx;
      line-height: 70rpx;
      background: #2eb232;
      border-radius: 45rpx;
      font-size: 24rpx;
      font-weight: bold;
      color: #ffffff;
      margin: 0rpx;
    }
  }
}

.modal {
  .modal-content {
    padding: 30rpx;
    max-height: 500rpx;
    .underline {
      padding-bottom: 60rpx;
      .list:not(:last-child) {
        margin-bottom: 30rpx;
      }
      .list {
        width: 630rpx;
        height: 110rpx;
        border-radius: 20rpx;
        background: #f5f5f5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 34rpx 30rpx;
        .name {
          font-size: 30rpx;
          font-weight: bold;
          color: #333333;
        }
        .info {
          display: flex;
          align-items: center;
          .phone {
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
          }
          .img {
            padding-left: 56rpx;
            image {
              width: 12rpx;
              height: 20rpx;
            }
          }
        }
      }
      .list.action {
        background: #f4fff1;
        border: 1px solid #2eb232;
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
      }
    }
    .online {
      padding-bottom: 60rpx;
      .list:not(:last-child) {
        margin-bottom: 30rpx;
      }
      .list {
        width: 630rpx;
        height: 164rpx;
        border-radius: 20rpx;
        background: #f5f5f5;
        padding: 34rpx 30rpx;
      }
      .list.action {
        background: #f4fff1;
        border: 1px solid #2eb232;
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
      }
    }
    .add {
      width: 630rpx;
      height: 110rpx;
      line-height: 110rpx;
      text-align: center;
      background: #f5f5f5;
      font-size: 30rpx;
      font-weight: bold;
      color: #78cf7b;
      border-radius: 20rpx;
    }
  }
  .modal-btn {
    padding: 30rpx;
    display: flex;
    background: #fff;
    position: relative;
    z-index: 10;
    button {
      width: 300rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      border: none;
      font-size: 30rpx;
      font-weight: bold;
      color: #666666;
    }
    button::after {
      display: none;
    }
    .cancel {
      background: #f5f5f5;
    }
    .confirm {
      background: #2eb232;
      color: #fff;
    }
  }
}
</style>