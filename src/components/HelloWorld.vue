<template>

  <div class="main">
    <h1>{{ msg }}</h1>

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

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome To TU food '
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  width: 50%;
  height: 30px;
  background-color:rgba(135, 88, 180, 0.425);
}
h1, h2 {
  font-weight: normal;
}

</style>
