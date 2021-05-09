<template>
<body>
    <div class="Team">
    <h1><strong> TEAM </strong></h1>
    </div>
    <div class="gallery">
      <div class="row">
        <div class="image"><img src="../assets/beam.jpg"></div>
        <div class="image"><img src="../assets/ip.jpg"></div>
        <div class="image"><img src="../assets/palmy.jpg"></div>
        <div class="image"><img src="../assets/parn.jpg"></div>
      </div>
      <div class="row">
        <div class="image"><img src="../assets/kt.jpg"></div>
        <div class="image"><img src="../assets/por.jpg"></div>
        <div class="image"><img src="../assets/flash.jpg"></div>
      </div>
    </div>
      

    
</body>
</template>

<script>
export default {
  name: 'Team'
}
</script>

<style scoped>
h1 {
  margin: 60px;
  font-size: xx-large;

}
p {
  display: block;
  margin: 60px;
  align-content: flex-start;

}
body{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 100%;
  margin: center;
  
}
.row{
  display: table-row;
}
.gallery{
  width:40%; float: none; display: table-row;
}
.image{width:40%;  padding:2%; float: none; display:table-cell ;}
</style>