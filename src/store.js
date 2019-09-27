import Vue from 'vue'
import Vuex from 'vuex'
import {
  SET_TOKEN,
    CLEAR_TOKEN,
  CLEAR_USER,
  SET_USER
} from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '', // 登录凭证
    user: {} // 用户详情
  },
  mutations: {

    [SET_TOKEN](state, token) {
      state.token = token;
    },
    [CLEAR_TOKEN](state) {
      state.token = '';
    },

    [SET_USER](state, user) {
      state.user = user;
    },
    [CLEAR_USER](state) {
      state.user = {};
    },
  },
  actions: {

  }
})
