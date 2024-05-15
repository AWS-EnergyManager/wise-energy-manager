import { createStore } from 'vuex'

export default createStore({
  state: {
    acceddToken: null,

  },
  getters: {

  },
  mutations: { // mutations are synchronous
    setToken(state, token) {
      state.acceddToken = token
    }
  
  },
  actions: { // actions are asynchronous

  },
  modules: {

  }
})
