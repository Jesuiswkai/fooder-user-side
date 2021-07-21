export default {
  namespaced: true,
  state: {
    searchHistory: [],
    provider: {},
    coupon: null
  },
  getters: {
    getsh: (state, getters, rootState, rootGetters) => {
      return state.searchHistory
    },
    getProvider: state => {
      return state.provider
    },
    getCoupon: state => {
      return state.getCoupon
    }
  },
  mutations: {
    // 设置历史搜索
    setsh: (state, step) => {
      if (state.searchHistory.length < 4) {
        state.searchHistory.unshift(step)
      } else {
        state.searchHistory.unshift(step)
        state.searchHistory = state.searchHistory.slice(0, 4)
      }
    },
    // 清空历史搜索
    emptySh: (state, step) => {
      state.searchHistory = []
    },
    // 设置服务商
    setProvider: (state, step) => {
      state.provider = step
    },
    // 设置选择的优惠券
    setCoupon: (state, step) => {
      state.coupon = step
    },
    // 清除选择的优惠券
    emptyCoupon: (state, step) => {
      state.coupon = null
    }
  },
  actions: {
    // name: ({ state }) => {
    // }
  }
}
