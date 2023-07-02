import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false,
      fixedHeader: false,
      sidebarLogo: false,
    },
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
