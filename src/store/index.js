import { createStore } from 'vuex';


export default createStore({
  state: {
    powerData: []
  },
  getters: {
    // Define getters here if needed
    powerData: state => state.powerData
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
        console.log("拿到VUEX資料");
        console.log(payload);
      } catch (error) {
        console.error("Failed to get power data", error);
      }
    }
  },
  modules: {
    // Define modules here if needed
  }
});
