<template>
  <view
    class="basic-view-loading"
    :style="{
      backgroundColor: bgColor,
      height: height,
      borderRadius: borderRadius
    }"
  >
    <u-loading mode="circle" :size="size"></u-loading>
  </view>
</template>

<script>
import basic from '../../index.mixin';

export default {
  mixins: [basic]
};
</script>

<style lang="scss" scoped>
.basic-view-loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}
</style>
