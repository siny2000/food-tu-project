<template>
  <div class="main">
    <div id="app">
      <!--แถบข้างบนค้าบ-->
      <div v-if="chekekDisplayNavBar" class="topnav">
        <!--แก้ปุ่มเขียวให้กดได้แล้วเปลี่ยนเป็นคำว่า Home -->
        <!-- <router-link class="active" to="/">Home</router-link> -->
        <router-link v-if="user.data.role == 'shop'" to="/Store"
          >STORE</router-link
        >

        <router-link v-if="user.data.role == 'shop'" to="/UpdateMenu"
          >UPDATE MENU</router-link
        >
        <!-- <router-link to="/User">USER</router-link> -->
        <router-link v-if="user.data.role == 'user'" to="/Choosestore"
          >STORE</router-link
        >
        <router-link v-if="user.data.role == 'user'" to="/Basket"
          >BASKET</router-link
        >
        <router-link v-if="!user.loggedIn" to="/Login">Login</router-link>
        <!-- <router-link to="/Register">Register</router-link> -->
        <a
          v-if="user.loggedIn"
          href="#"
          @click.prevent="logout"
          style="color:white;"
          >LOGOUT</a
        >
        <router-link to="/About">ABOUT</router-link>
        <router-link to="/Team">TEAM</router-link>
        <router-link to="/FollowUs">FOLLOW US</router-link>
      </div>

      <!-- router view คือ path ต่างๆของเว็บ แก้ใน router/index.js -->
      <router-view />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  name: "App",
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          if (this.$route.path != "/")
            this.$router.replace({
              name: "HelloWorld",
            });
        });
    },
  },
  created() {},
  computed: {
    ...mapGetters({
      user: "user",
    }),
    chekekDisplayNavBar() {
      return this.$route.path != "/" && this.$route.path != "/Register";
    },
  },
};
</script>

<style>
.topnav {
  overflow: hidden;
  background-color: #010100;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
  padding: 10px 50px;
}

.topnav a:hover {
  background-color: #fdb750;
  color: black;
}
.topnav a.active {
  background-color: #fc2e20;
  color: white;
  margin: 60;
}
</style>
