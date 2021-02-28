<template>

  <div class="main">
    <h1>{{ msg }}</h1>

    <!--ให้เลือกStore or User-->
    <div><button v-on:click="Store">For Store</button></div>
    <br>
    <div><button v-on:click="User">For User</button></div>

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
