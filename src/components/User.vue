<template>
  <div class="user">
    <h1>{{ msg }}</h1>
      <!-- -->
      <div class ="topnav">
        <a class="active" id="storename">User</a>
        <router-link to="/">Sign up</router-link>
        <router-link to="/">Sign in</router-link>
        <router-link to="/">Back</router-link>
    
    
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
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
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
