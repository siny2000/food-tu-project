import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import firebase มาใช้
import firebase from "firebase"

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCDgTPVW8tnv2_-2O7rAoEIZmBqU32Hmfo",
  authDomain: "login-8bda2.firebaseapp.com",
  projectId: "login-8bda2",
  storageBucket: "login-8bda2.appspot.com",
  messagingSenderId: "1073183550871",
  appId: "1:1073183550871:web:9a5bca6c453fddf67368d2",
  measurementId: "G-50KEX0CNBH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

