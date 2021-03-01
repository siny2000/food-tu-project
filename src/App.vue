<template>
  <div id="app">
    <!--แถบข้างบนค้าบ-->
    <div class="topnav">
      <a class="active">Our Web Name Ka</a>
      <router-link to="/Store">STORE</router-link>
      <router-link to="/User">USER</router-link>
      <router-link to="/About">ABOUT</router-link>
      <router-link to="/Team">TEAM</router-link>
      <router-link to="/FollowUs">FOLLOW US</router-link>
    </div>
    <router-view></router-view>
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
  background-color: #333;
}

.topnav a {
  float : left;
  color: #f2f2f2;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
  padding: 20px 60px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}
.topnav a.active {
  background-color: #4CAF50;
  color: white;
}
</style>
