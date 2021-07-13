<template>
  <app-page title="关于我们" :bgColor="bgColor" showNavbar>
    <view class="container">
      <u-parse :html="content"></u-parse>
    </view>
  </app-page>
</template>

<script>
export default {
  data() {
    return {
      bgColor: '#f5f5f5',
      content: `
					<p>露从今夜白，月是故乡明</p>
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
				`,
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 690rpx;
  margin: 0 auto;
  margin-top: 30rpx;
}
</style>