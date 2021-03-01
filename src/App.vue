<template>
  <div id="app">
    <!-- ตั้งให้ไฟล์ chi ขึ้นตลอด -->
    <img src="./assets/chi.png">
    <!-- router view คือ path ต่างๆของเว็บ แก้ใน router/index.js -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
