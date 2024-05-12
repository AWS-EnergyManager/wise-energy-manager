import { createStore } from 'vuex'

export default createStore({
  state: {
    subSideActive: false,
  },
  getters: {

  },
  mutations: { // mutations are synchronous
    setSubSideActive(state, payload) {
      state.subSideActive = payload
    }
  },
  actions: { // actions are asynchronous
  },
  modules: {

  }
})
