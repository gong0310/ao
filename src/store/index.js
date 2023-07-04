import Vue from "vue";
import Vuex from "vuex";
import { setToken } from "@/utils/common-func";

const MockAxios = (data) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, 1000);
  });
};
//-------------------------------
Vue.use(Vuex); // base_vue2.0

export default new Vuex.Store({
  state: {
    userInfo: {},
    menuList: [],
    token: "",
  },
  getters: {
    multiplyCount(state) {
      return state.count * 100;
    },
  },
  mutations: {
    updateMenuList(state, payload) {
      state.menuList = payload;
    },
    updateUserInfo(state, payload) {
      state.userInfo = payload;
    },
    updatetoken(state, payload) {
      state.token = payload;
      setToken(payload);
    },
  },
  actions: {
    async undaptCountMinAction({ commit, state }, payload) {
      const count = await MockAxios(payload);
      commit("undaptCountMin", count, state);
    },
  },
  modules: {},
});
