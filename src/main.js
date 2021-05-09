import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import firebase มาใช้
import firebase from "firebase";

Vue.config.productionTip = false;
export const bus = new Vue();
const firebaseConfig = {
  apiKey: "AIzaSyDQYs-zxSYoeXjzRTlo6WU957mLzAJGMco",
  authDomain: "food-ab5af.firebaseapp.com",
  projectId: "food-ab5af",
  storageBucket: "food-ab5af.appspot.com",
  messagingSenderId: "519071358552",
  appId: "1:519071358552:web:d1b563f623dac32188b42d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
