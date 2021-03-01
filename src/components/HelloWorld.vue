<template>
  <div class="main">
    <h1>{{ msg }}</h1>
<<<<<<< HEAD

    <!-- เลือก login หรือ register -->
    <div><router-link to="/Login">Login</router-link></div>
    <br>
    <div><router-link to="/Register">Register</router-link></div>
    <!--ให้เลือกStore or User-->
    <br>
    <br>
    <div><router-link to="/Store">Store</router-link></div>
    <br>
    <div><router-link to="/User">User</router-link></div>
    
    <!-- ปล. มันยังเป็นแค่ลิ้งค์ ถ้าว่างก็หาวิธีใส่ปุ่มให้หน่อยนะ -->

=======
    <h1>Test by Ip</h1>
>>>>>>> 614eee5b3d4d042f74e541ec99442568ecd3d524
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ' '
    }
  }
}
</script>

<style scoped>
</style>
