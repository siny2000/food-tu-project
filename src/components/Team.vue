<template>
<body>
    <div class="Team">
    <h1><strong> TEAM <br></strong></h1>
    </div>
    <div class="gallery">
      <div class="row">
        <div class="image"><img src="../assets/beam.jpg"><br>Suthasinee Wongsricha<br>6210742182</div>
        <div class="image"><img src="../assets/ip.jpg"><br>Suyada Sinanun<br>6210742133</div>
        <div class="image"><img src="../assets/palmy.jpg"><br>Thanyaporn Ngamsamgeim<br>6210742125</div>
        <div class="image"><img src="../assets/parn.jpg"><br>Paphassorn Lersbanchorn<br>6210742323</div>
        
      </div>
      <div class="row">
        <div class="image"><img src="../assets/kt.jpg"><br>Tanabut Ngoensri<br>6210742067</div>
        <div class="image"><img src="../assets/por.jpg"><br>Suttipong Sirirak<br>6210743065</div>
        <div class="image"><img src="../assets/flash.jpg"><br>Supakorn Peng-ont<br>6210742059</div>
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
  margin: 40px;
  font-size: xx-large;

}
p {
  display: block;
  
  align-content: flex-start;

}
body{
  
  font-family: Arial, Helvetica, sans-serif;
  font-size: 100%;
  margin: 60px;
}
.row{
  display: table-row;
}
.gallery{
  width:40%; float: none; display: table-row;
  margin: 60px
  
}
.image{width:40%;  padding:2%; float: none; display:table-cell ;}



</style>