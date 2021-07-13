export default {
  namespaced: true,
  state: {
    statusBarHeight: 0,
    windowWidth: 0,
    navBarHeight: 0
  },
  getters: {},
  mutations: {
    setStatusBarHeight: (state, payload) => {
      state.statusBarHeight = payload.value
    },
    setWindowWidth: (state, payload) => {
      state.windowWidth = payload.value
    },
    setNavBarHeight: (state, payload) => {
      state.navBarHeight = payload.value
    }
  },
  actions: {
    // name: ({ state }) => {
    // }
  }
}
