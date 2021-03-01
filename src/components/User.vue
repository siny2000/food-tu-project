<template>
  <div class="user">
    <h1>{{ msg }}</h1>

      <!--แถบข้างบนค้าบ-->
    <div class="topnav">
      <router-link to="/Store">STORE</router-link>
      <router-link to="/User">USER</router-link>
      <router-link to="/About">ABOUT</router-link>
      <router-link to="/Team">TEAM</router-link>
      <router-link to="/FollowUs">FOLLOW US</router-link>
    </div>

      <!--ลิสต์ของออเดอร์ -->
      
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      msg: ' '
    }
  }
}
</script>

<style scoped>

.topnav {
  height: 50px;
  float: center;
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: center;
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
