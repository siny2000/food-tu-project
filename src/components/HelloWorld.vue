<template>
  <div class="main">
    <h1 id="welcome">{{ msg }}</h1>

    <!-- เลือก login หรือ register -->
    <div class="login"><router-link to="/Login">Login</router-link></div>
    <br>
    <div class="register"><router-link to="/Register">Register</router-link></div>
    
    <!-- ปล. มันยังเป็นแค่ลิ้งค์ ถ้าว่างก็หาวิธีใส่ปุ่มให้หน่อยนะ -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Food TU '
    }
  }
}
</script>

<style scoped>
.main {
    text-align: center;

}
</style>
