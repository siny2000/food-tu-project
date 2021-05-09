<template>
  <div class="main">
    <div id="app">
      <!--แถบข้างบนค้าบ-->
      <div v-if="checkDisplayNavBar" class="topnav">
        <!--แก้ปุ่มเขียวให้กดได้แล้วเปลี่ยนเป็นคำว่า Home -->
        <!-- <router-link class="active" to="/">Home</router-link> -->
        <router-link v-if="userRole == 'shop'" to="/Store">STORE</router-link>

        <router-link v-if="userRole == 'shop'" to="/UpdateMenu"
          >UPDATE MENU</router-link
        >
        <!-- <router-link to="/User">USER</router-link> -->
        <router-link v-if="userRole == 'user'" to="/Choosestore"
          >STORE</router-link
        >
        <router-link v-if="userRole == 'user'" to="/Basket">BASKET</router-link>
        <!-- <router-link v-if="!user.loggedIn" to="/Login">Login</router-link> -->
        <!-- <router-link to="/Register">Register</router-link> -->

        <router-link to="/About">ABOUT</router-link>
        <router-link to="/Team">TEAM</router-link>
        <router-link to="/FollowUs">FOLLOW US</router-link>
        <a
          v-if="user.loggedIn"
          href="#"
          @click.prevent="logout"
          style="color:red;"
          >LOGOUT</a
        >
      </div>

      <!-- router view คือ path ต่างๆของเว็บ แก้ใน router/index.js -->
      <router-view />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import { bus } from "./main";
export default {
  name: "App",
  data() {
    return {
      userRole: "",
    };
  },
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
  created() {
    bus.$on("UserRoleUpdate", (data) => {
      console.log("UserRoleHasBeenUpdated");
      this.userRole = data;
    });
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
    checkDisplayNavBar() {
      return this.$route.path != "/" && this.$route.path != "/Register";
    },
    isUserRole() {
      return this;
    },
    isShopRole() {
      return this.user.data?.role == "shop";
    },
  },
  watch: {
    userData(newValue, oldValue) {
      console.log(newValue, oldValue);
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
