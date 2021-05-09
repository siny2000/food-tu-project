import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import { bus } from "../main";
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
    SET_ROLE(state, data) {
      state.user.data.role = data;
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });
        const db = firebase.firestore();
        db.collection("UserData")
          .doc(user.uid)
          .get()
          .then((userData) => {
            commit("SET_ROLE", userData.data().role);
            bus.$emit("UserRoleUpdate", userData.data().role);
          });
      } else {
        commit("SET_USER", null);
        bus.$emit("UserRoleUpdate", null);
      }
    },
    setUserRole({ commit }, role) {
      commit("SET_ROLE", role);
    },
  },
});
