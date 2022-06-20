import Vue from "vue";
import Vuex from "vuex";
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedstate({
      storage: window.localStorage
    })
  ],
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
