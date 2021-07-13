<template>
  <app-page title="订单详情" showNavbar>
    <button @click="getProvider">获取服务供应商</button>
    <button @click="pay">支付</button>

    <u-select
      v-model="show"
      mode="mutil-column-auto"
      :list="list"
      :default-value="[0, 1, 1]"
    ></u-select>
  </app-page>
</template>

<script>
import md5 from 'js-md5'
export default {
  data() {
    return {
      show: true,
      list: [
        {
          value: 1,
          label: '中国',
          children: [
            {
              value: 2,
              label: '广东',
              children: [
                {
                  value: 3,
                  label: '深圳',
                },
                {
                  value: 4,
                  label: '广州',
                },
              ],
            },
            {
              value: 5,
              label: '广西',
              children: [
                {
                  value: 6,
                  label: '南宁',
                },
                {
                  value: 7,
                  label: '桂林',
                },
              ],
            },
          ],
        },
        {
          value: 8,
          label: '美国',
          children: [
            {
              value: 9,
              label: '纽约',
              children: [
                {
                  value: 10,
                  label: '皇后街区',
                },
              ],
            },
          ],
        },
      ],
    }
  },
  mounted() {
    // console.log('随机字符串', this.createNoncestr())
    this.getProvider()
  },
  methods: {
    getProvider() {
      uni.getProvider({
        service: 'payment',
        success: (data) => {
          console.log(data)
        },
      })
    },
    pay() {
      // {"code":0,"msg":null,"data":{"package":"Sign=WXPay","appid":"wx2717380465250176","sign":"6FEFE020CCF378C923DDA01EDA247F80","partnerid":"1604930438","prepayid":"wx0815573388478377227659922131870000","noncestr":"8c75791b109b4d14b80af425bbdb8356","timestamp":"1625731062"}}
      this.show = true
      return
      this.Api.user.getPayInfo
        .do({
          providersId: 'oliver',
          pickWay: '1',
          goods: [
            {
              goodsId: 1,
              num: 1,
            },
          ],
          conponId: '1',
          selfPickId: '1',
          expectTime: '2021-07-06 18:26:00',
          remark: '备注',
          payType: 1,
          consignee: 'oliver',
          contactNumber: '123456',
          province: '重庆',
          city: '重庆市',
          area: '南岸区',
          detailAddress: '122323',
        })
        .then((res) => {
          console.log('调支付')
          uni.requestPayment({
            provider: 'wxpay',
            // orderInfo: {
            //   // appid: res.appid,
            //   timeStamp: String(Date.now()),
            //   nonceStr: 'A1B2C3D4E5',
            //   package: 'prepay_id=' + res.prepayid + '',
            //   // partnerid: res.partnerid,
            //   signType: 'MD5',
            //   paySign: paySign,
            //   appid: 'wx2717380465250176',
            //   partnerid: '1604930438',
            //   prepayid: 'wx08152035458144d01ca0bcee8a1e190000',
            // },
            orderInfo: res.data,
            success: function (res) {
              console.log('success:' + JSON.stringify(res))
              alert(JSON.stringify(res))
            },
            fail: function (err) {
              console.log('fail:' + JSON.stringify(err))
              alert(JSON.stringify(err))
            },
            complete: function (data) {
              console.log('complete:' + JSON.stringify(data))
              alert(JSON.stringify(data))
            },
          })
        })

      // const paySign = md5(
      //   'appid=wx2717380465250176' +
      //     '&nonceStr=A1B2C3D4E5' +
      //     '&package=prepay_id=wx08152035458144d01ca0bcee8a1e190000' +
      //     '&signType=MD5' +
      //     '&timeStamp=' +
      //     String(Date.now()) +
      //     ''
      // )
      // uni.requestPayment({
      //   provider: 'wxpay',
      //   // appid: res.appid,
      //   timeStamp: String(Date.now()),
      //   nonceStr: 'A1B2C3D4E5',
      //   package: 'prepay_id=wx08152035458144d01ca0bcee8a1e190000',
      //   // partnerid: res.partnerid,
      //   signType: 'MD5',
      //   paySign: paySign,
      //   appid: 'wx2717380465250176',
      //   partnerid: '1604930438',
      //   prepayid: 'wx08152035458144d01ca0bcee8a1e190000',
      //   success: function (res) {
      //     console.log('success:' + JSON.stringify(res))
      //   },
      //   fail: function (err) {
      //     console.log('fail:' + JSON.stringify(err))
      //   },
      //   complete: function (data) {
      //     console.log('complete:' + JSON.stringify(data))
      //   },
      // })
    },
    createNoncestr(length = 32) {
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var maxPos = $chars.length
      var pwd = ''
      for (let i = 0; i < 32; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
  },
}
</script>

<style lang="scss" scoped>
</style>