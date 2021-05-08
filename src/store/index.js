import { getIterator } from "core-js";
import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    async fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        const userData = await firebase
          .firestore()
          .collection("UserData")
          .doc(user.uid)
          .get();
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          role: userData.data().role,
        });
      } else {
        commit("SET_USER", null);
      }
    },
  },
});
