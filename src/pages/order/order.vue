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
          <service-item :obj="providerObj"></service-item>
        </view>
      </view>

      <!--选择配送方式-->
      <view class="distribute">
        <view class="distribute-title">
          <view class="text">选择配送方式</view>
        </view>

        <view class="distribute-content">
          <view class="tab">
            <view
              class="fixed"
              :class="tabShow ? 'action' : ''"
              @click="switchDispath(1)"
              >门店自提</view
            >
            <view
              class="mobile"
              :class="!tabShow ? 'action' : ''"
              @click="switchDispath(0)"
              >线上配送</view
            >
          </view>
          <view class="center">
            <!--门店自提-->
            <view v-show="tabShow" class="fixed-content">
              <view class="item">
                <view>陈锐</view>
                <view class="info">
                  <text>18002334272</text>
                  <image src="@/static/public/right.png" mode="" />
                </view>
              </view>
              <view class="item">
                <view>预计自提时间</view>
                <view class="info">
                  <text>2021.06.29</text>
                  <image
                    src="@/static/public/date_time.png"
                    mode=""
                    style="width: 20rpx; height: 20rpx"
                  />
                </view>
              </view>
            </view>
            <!--线上配送-->
            <view v-show="!tabShow" class="mobile-content">
              <view class="dis-item">
                <view class="info">
                  <view>陈锐</view>
                  <view class="phone">
                    <text>18002334272</text>
                    <image src="@/static/public/right.png" mode="" />
                  </view>
                </view>
                <view class="address">重庆市江北区西普大厦10-1</view>
              </view>
              <view class="item">
                <view>期望配送时间</view>
                <view class="info">
                  <text>2021.06.29</text>
                  <image src="@/static/public/date_time.png" mode="" />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!--订单详情-->
      <view class="order">
        <view class="order-title">
          <view class="text">订单详情</view>
        </view>

        <view class="order-content">
          <view class="order-info">
            <view
              v-for="(shopObj, index) of shopObjs"
              :key="index"
              :class="index != 0 ? 'marginTop' : ''"
            >
              <shop-order :obj="shopObj"></shop-order>
            </view>
            <view style="margin-top: 20rpx">
              <shop-list :list="shopList"></shop-list>
            </view>
            <view class="coupon" @click="toSelectCoupon">
              <view class="name">优惠券</view>
              <view class="info">
                <view v-show="selectedCoupon" class="price">
                  <text>-</text>
                  <text>¥</text>
                  <text>{{ selectedCoupon.priceStr }}</text>
                </view>
                <view
                  v-show="!selectedCoupon"
                  style="font-size: 24rpx; font-weight: 400; color: #999999"
                  >请选择优惠券</view
                >
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
          <text class="value">¥{{ nowPrice }}</text>
        </view>
        <button class="pay" @click="pay">立即下单</button>
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
import { mapState } from 'vuex'
export default {
  components: {
    serviceItem,
    shopOrder,
    shopList,
  },
  data() {
    return {
      bgColor: '#f5f5f5',
      providerObj: {
        id: '',
        image: '',
        name: '西普6号',
        isDefault: 1,
        distanceString: '2.80km',
        addressDetail:
          '重庆市渝中区纯阳洞5号重庆市渝中区纯阳洞5号重庆市渝中区纯阳洞5号',
      },
      shopObjs: [],
      shopList: [
        { name: '商品金额', price: '0', orange: 0, minus: 0 },
        // { name: '自提优惠', price: '0', orange: 1, minus: 1 },
      ],
      nowPrice: '0', //现价
      couponList: [], //优惠券列表
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
      tabShow: true,
      deliveryMethod: {
        //自提
        submit: {},
        //线上
        onLine: {},
      },
    }
  },
  computed: {
    ...mapState({
      selectedCoupon: (state) => state.other.coupon,
    }),
  },
  watch: {
    selectedCoupon: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.calcOrderPrice(newVal.id)
        }
      },
      deep: true,
    },
  },
  onLoad(data) {
    if (data.previewData) {
      this.updateOrderInfo(JSON.parse(data.previewData))
    }
  },
  onShow() {
    const providerInfo = this.$store.getters['other/getProvider']
    this.updateProvider(providerInfo)
  },
  onUnload() {
    this.$store.commit('other/emptyCoupon')
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
    //更新服务商
    updateProvider(data) {
      // 服务商
      for (let obj in this.providerObj) {
        this.providerObj[obj] = data[obj]
      }
      this.providerObj.isDefault = 1
    },
    //切换配送方式
    switchDispath(status) {
      this.tabShow = status == 1 ? true : false
      this.calcOrderPrice()
    },
    //计算订单价格
    calcOrderPrice(conponId) {
      const goods = []
      for (let item of this.shopObjs) {
        let obj = {
          goodsId: item.id,
          num: item.num,
        }
        goods.push(obj)
      }
      const data = {
        providersId: this.providerObj.id,
        pickWay: this.tabShow ? 1 : 2,
        goods: goods,
        conponId: conponId ? conponId : null,
      }
      this.Api.order.orderNow
        .do(data)
        .then((res) => {
          this.updateOrderInfo(res)
        })
        .catch((err) => {
          this.tabShow = !this.tabShow
        })
    },
    //更新页面订单信息
    updateOrderInfo(data) {
      //商品列表&规格
      this.shopObjs = data.goodsListDtoList
      //自提
      if (this.tabShow) {
        if (this.shopList.length == 2) {
          this.shopList[1].price = data.pickSelfAmount
        } else {
          this.shopList.push({
            name: '自提优惠',
            price: data.pickSelfAmount,
            orange: 1,
            minus: 1,
          })
        }
      }
      //商品原价&现价
      this.shopList[0].price = data.goodsOriginAmount
      this.nowPrice = data.goodsNowAmount
      this.couponList = data.orderCouponDtos
    },
    //选择优惠券
    toSelectCoupon() {
      uni.navigateTo({
        url:
          '../orderCoupon/orderCoupon?couponList=' +
          JSON.stringify(this.couponList),
      })
    },
    pay() {
      const goods = []
      for (let item of this.shopObjs) {
        let obj = {
          goodsId: item.id,
          num: item.num,
        }
        goods.push(obj)
      }
      const data = {
        providersId: this.providerObj.id, //服务商id
        pickWay: this.tabShow ? '1' : '2', //提货方式 1: 自提 2: 配送
        goods: goods,
        conponId: this.selectedCoupon ? this.selectedCoupon.id : '', //优惠券ID
        selfName: '万锴', //自提人名称
        selfPhone: '17623563437', //自提人电话
        expectTime: '2021-07-06 18:26:00', //期望配送时间
        remark: '备注', //备注
        payType: 2, //2: 小程序  1: app
        openId: this.$store.getters['auth/openId'],
        consignee: 'oliver', //收货人
        contactNumber: '123456', //联系电话
        province: '重庆', //省
        city: '重庆市', //市
        area: '南岸区', //区
        detailAddress: '122323', //详细地址
      }
      this.Api.order.orderPay.do(data).then((res) => {
        uni.requestPayment({
          provider: 'wxpay',
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: 'MD5',
          paySign: res.paySign,

          success: (res) => {
            console.log('success:' + JSON.stringify(res))
            const shopIds = this.shopObjs.map((item) => {
              return item.id
            })
            uni.redirectTo({
              url:
                '../paymentSuccessful/paymentSuccessful?shopIds=' +
                JSON.stringify(shopIds),
            })
          },
          fail: (err) => {
            console.log('fail:' + JSON.stringify(err))
          },
          complete: (data) => {
            console.log('complete:' + JSON.stringify(data))
          },
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.marginTop {
  margin-top: 20rpx;
}
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
        .fixed.action,
        .mobile.action {
          background: #ffffff;
          color: #2eb232;
        }
      }
      .center {
        padding: 20rpx;
        background: #fff;
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
        .fixed-content {
          width: 100%;
          height: 100%;
          > .item:not(:first-child) {
            margin-top: 20rpx;
          }
          > .item {
            width: 100%;
            height: 110rpx;
            background: #f5f5f5;
            border-radius: 20rpx;
            padding: 0 30rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            > .info {
              display: flex;
              align-items: center;
              text {
                width: 200rpx;
                text-align: right;
              }
              image {
                width: 12rpx;
                height: 20rpx;
                margin-left: 60rpx;
              }
            }
          }
        }
        .mobile-content {
          > .dis-item {
            width: 100%;
            height: 164rpx;
            background: #f5f5f5;
            border-radius: 20rpx;
            padding: 30rpx;
            > .info {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .phone {
                display: flex;
                align-items: center;
                image {
                  width: 12rpx;
                  height: 20rpx;
                  margin-left: 60rpx;
                }
              }
            }
            > .address {
              margin-top: 20rpx;
              color: #666666;
            }
          }
          > .item {
            width: 100%;
            height: 110rpx;
            background: #f5f5f5;
            border-radius: 20rpx;
            padding: 0 30rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20rpx;
            > .info {
              display: flex;
              align-items: center;
              text {
                width: 200rpx;
                text-align: right;
              }
              image {
                width: 20rpx;
                height: 20rpx;
                margin-left: 60rpx;
              }
            }
          }
        }
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