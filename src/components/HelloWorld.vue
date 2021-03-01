<template>

  <div class="main">
    <h1>{{ msg }}</h1>

    <!--ให้เลือกStore or User-->
    <div class="topnav">
      <a class="active" id="choose"> Please Select</a>
      <router-link to="/Store">For Store</router-link>
      <router-link to="/User">For User</router-link>
    </div>
  
    

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
