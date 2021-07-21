export default {
  namespaced: true,
  state: {
    isLogin: false,
    userId: null,
    token: null,
    location: {}, //位置信息，经纬度
    city: null, //当前城市信息
    platform: 2, //平台信息 0: android 1: ios 2: 小程序
    openId: ''
  },
  getters: {
    isLogin: (state, getters, rootState, rootGetters) => {
      return state.isLogin
    },
    token: (state, getters, rootState, rootGetters) => {
      return state.token || ''
    },
    getLocation: state => {
      return state.location
    },
    getCity: state => {
      return state.city
    },
    platform: state => {
      return state.platform
    },
    openId: state => {
      return state.openId
    }
  },
  mutations: {
    login: (state, step) => {
      state.userId = step.userId
      state.token = step.token
      state.isLogin = true
    },
    logout: (state, step) => {
      state.userId = null
      state.token = null
      state.isLogin = false
    },
    updateLocation: (state, step) => {
      state.location = step
    },
    updateCity: (state, step) => {
      state.city = step
    },
    platform: (state, step) => {
      state.platform = step
    },
    openId: (state, step) => {
      state.openId = step
    }
  },
  actions: {
    // name: ({ state }) => {
    // }
  }
}
