import { createStore } from 'vuex';


export default createStore({
  state: {
    powerData: []
  },
  getters: {
    // Define getters here if needed
  },
  mutations: { // mutations are synchronous
    setPowerData(state, payload) {
      state.powerData = payload;
    }
  },
  actions: { // actions are asynchronous
    async savePowerData({ commit },payload) {
      try {
        commit('setPowerData', payload);
        console.log("Got power data");
      } catch (error) {
        console.error("Failed to get power data", error);
      }
    }
  },
  modules: {
    // Define modules here if needed
  }
});
