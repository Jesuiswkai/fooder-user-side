export default {
  namespaced: true,
  state: {
    searchHistory: [],
    defaultProvider: {}, //默认、最近的服务商
    selectProvider: {}, //订单页选择的服务商
    coupon: null
  },
  getters: {
    getsh: (state, getters, rootState, rootGetters) => {
      return state.searchHistory
    },
    defaultProvider: state => {
      return state.defaultProvider
    },
    selectProvider: state => {
      return state.selectProvider
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
    defaultProvider: (state, step) => {
      state.defaultProvider = step
    },
    // 设置订单页选择的服务商
    selectProvider: (state, step) => {
      state.selectProvider = step
    },
    emptySelectProvider: (state, step) => {
      state.selectProvider = {}
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
