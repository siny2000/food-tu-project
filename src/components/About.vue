<template>
<body>
    <div class="About">
    <h1><strong> ABOUT </strong></h1>
      <center><img src="../assets/โรงอาหาร.jpg"></center>
    <div class="image"><img src="../assets/food tu.png" width="200" height="200"></div>
    <h2>
      <strong> FOUNDED IN 2021 </strong>
    </h2>
    
    <h3 style="padding-bottom:30px;">
      <strong> BECAME THE FIRST TU FOOD APPLICATION. </strong>
    </h3>
    <p>
      จากโปรเจคของรายวิชา CN320 และ SF221 ซึ่งเกี่ยวกับ network และ software process
    <br><br>
      เราเล็งเห็นได้ว่าจำนวนนักศึกษาในมหาวิทยาลัยธรรมศาสตร์ศูนย์รังสิตมีจำนวนมากต่อจำนวนร้านอาหารที่โรงอาหาร sc 
    <br><br>
      เวลาที่พักระหว่างเรียนตอนเช้าและตอนบ่ายมีแค่ 1 ชั่วโมง ทำให้เกิด application ขึ้นมา <br>
      เพื่อลดระยะเวลาที่ต่อคิวรออาหารจากร้านโปรดที่คนเยอะให้ม้เวลาเหลือไปทำอย่างอื่นได้อย่างอิสระ
    </p>



    </div>
</body>
</template>

<script>
export default {
  name: 'About'
}
</script>
<style scoped>
h1 {
  margin: 60px;
  font-size: xx-large;

}

h2 {
  font-size: larger;
  margin: 40px;
}
p {
  display: block;
  width: 50%;
  margin: auto;
  text-align: center;
  padding:60px;
  background-color: rgb(255,255,255,0.5);


}
body{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 100%;
  background-image: url('../assets/bg2.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  text-align: center;
  padding: 70px;

}
.image{
  width: 100%;
  height: 100%;
  margin:auto;
  padding: 30px;
  
}
</style>