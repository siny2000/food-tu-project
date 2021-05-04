<template>
<div class="main">
  <div id="app">
    <!--แถบข้างบนค้าบ-->
    <div class="topnav">
      <!--แก้ปุ่มเขียวให้กดได้แล้วเปลี่ยนเป็นคำว่า Home -->
      <router-link class="active" to="/">Home</router-link>
      <router-link to="/Store">STORE</router-link>
      <router-link to="/UpdateMenu">UPDATE MENU</router-link>
      <router-link to="/User">USER</router-link>
      <router-link to="/About">ABOUT</router-link>
      <router-link to="/Team">TEAM</router-link>
      <router-link to="/FollowUs">FOLLOW US</router-link>
      <router-link to="/Login">Login</router-link>
      <router-link to="/Register">Register</router-link>
    </div>


    <!-- router view คือ path ต่างๆของเว็บ แก้ใน router/index.js -->
    <router-view/>

  </div>
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.topnav {
  overflow: hidden;
  background-color: #010100;
}

.topnav a {
  float : left;
  color: #f2f2f2;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
  padding: 10px 50px;
}

.topnav a:hover {
  background-color: #FDB750;
  color: black;
}
.topnav a.active {
  background-color: #FC2E20;
  color: white;
  margin: 60;
}
</style>
