export default {
  namespaced: true,
  state: {
    isLogin: false,
    userId: null,
    token: null
  },
  getters: {
    isLogin: (state, getters, rootState, rootGetters) => {
      return state.isLogin
    },
    token: (state, getters, rootState, rootGetters) => {
      return state.token || ''
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
    }
  },
  actions: {
    // name: ({ state }) => {
    // }
  }
}
