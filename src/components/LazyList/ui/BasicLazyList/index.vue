<template>
  <scroll-view
    v-if="!proxy"
    class="list-wrapper"
    scroll-y
    @scrolltolower="loadMore"
  >
    <slot v-if="!isInit"></slot>
    <u-loadmore
      v-if="showLoadmore"
      :status="status"
      font-size="24"
      @loadmore="loadMore"
    />
    <view-loading v-if="isInit" size="50"></view-loading>
    <view class="blank"></view>
  </scroll-view>
  <view v-else class="list-wrapper proxy-list-wrapper" :style="{ minHeight }">
    <slot v-if="!isInit"></slot>
    <u-loadmore
      v-if="showLoadmore"
      :status="status"
      font-size="24"
      @loadmore="loadMore"
    />
    <!-- 默认加载高度200rpx 和proxy-list-wrapper最小高度保持一致 -->
    <view-loading v-if="isInit" :height="minHeight" size="50"></view-loading>
    <view class="blank"></view>
  </view>
</template>

<script>
import basic from '../../index.mixin';
import ViewLoading from '@/components/ViewLoading/ui/BasicViewLoading/index.vue';

export default {
  mixins: [basic],
  components: {
    ViewLoading
  },
  props: {
    minHeight: {
      // 代理模式下列表最小高度
      type: String,
      default: '200rpx'
    }
  },
  data() {
    return {};
  },
  computed: {
    showLoadmore() {
      if (this.isInit) {
        return false;
      } else {
        if (this.hideLoadmore && this.listLength === 0) {
          return false;
        }
      }

      return true;
    },
    status() {
      if (this.finished) {
        return 'nomore';
      }

      if (this.value) {
        return 'loading';
      } else {
        return 'loadmore';
      }
    },
    isInit() {
      return this.listLength === 0 && this.value;
    },
    listLength() {
      return this.list.length;
    }
  },
  methods: {
    loadMore() {
      if (this.status !== 'nomore') {
        this.$emit('load');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.list-wrapper {
  width: 100%;
  height: 100%;
  // border: 1px solid black;
  position: relative;

  .blank {
    width: 100%;
    height: 30rpx;
  }
}

.proxy-list-wrapper {
  height: auto;
  // min-height: 200rpx;
}

u-loadmore {
  font-weight: normal;
}
</style>
