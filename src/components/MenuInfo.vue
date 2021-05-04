<template>
  <div class="main">
    <div class="container-fluid">
      <div class="row">
            <div class ="col-md-6">
              <h1>Order Information</h1>
              <div class="orderinfo">
                  <div class = "infocontainer">
                    <p>หัวข้อที่จะพูดในวันนี้ ธรรมะกระตุกจิตกระชากใจ เพื่อบรรลุอรหันต์ มันเป็นแบบนี้ ต้องมีอุปกรณ์ แม่เดินมาดูซิเนี่ย อะไรมันอยู่ในรถ นี่ หยิบออกมา หยิบออกมา เมื่อหยิบออกมาแล้ว ก็ต้องขอ ปิดก่อน เดินมาตรงนี้ ท่านผู้เจริญครับ โอ้ เห็นรึยัง ที่เห็นนี้คือ พลาสติก ที่แขวนผ้า เคยลงไปหลายคลิป เมื่อสัก8-9ปีก่อน คนฟังไม่เข้าใจ เราเห็นเนี่ยเราก็รู้อยู่แล้ว รู้ไหมคิดไปเรียบร้อยแล้วคืออะไร</p>
                  </div>
              </div>
              <h1>Order From</h1>
              <div class="orderfrom">
                  <div class = "fromcontainer">
                    <p>ผมนี่เข้าบ้าน ไขลูกกุญแจไม่ได้ เพราะอุณหภูมิติดลบ 20 เซลเซียส ตอนอยู่สหรัฐอเมริกา เลยถอดถุงมือออก แล้วไขกุญแจลูกบิด แล้วหลงลืมใส่ถุงมือก่อนจับลูกบิดประตู เลยทำให้มือติดลูกบิดประตู อันนี้เป็นเรื่องปกติ คนเราเผลอกันได้</p>
                  </div>
              </div>
            </div>
            <div class ="col-md-6">
              <div class="chat">
              chit chat chit chat bla bla bla
              </div>
            </div>
             <div class="col-md-3"><router-link to="/Store"><div class="buttons"><button type="button" class="btn btn-info" id="backbutton">BACK</button></div></router-link></div>
            <div class="col-md-3"><router-link to="/Store"><div class="buttons"><button type="button" class="btn btn-warning" id="savebutton">SAVE</button></div></router-link></div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
h1{
  margin-top : 5%;
}
.orderinfo {
  float : left;
  margin-top : 10%;
  background-color: #FDB750;
  width: 100%;
  border: 10px solid #FD7F20;
  padding: 25px;
  margin: 25px;
}
.orderfrom {
  float : left;
  background-color: #FDB750;
  width: 100%;
  border: 10px solid #FD7F20;
  padding: 25px;
  margin: 25px;
}
.infocontainer {
  float : left;

}
.fromcontainer{
  float : left;
}
.chatbox{
  float : right;
}
  .buttons{
    width: 10%;
    margin: auto;
    margin-top: auto;
  }
.chat{
  float : center;
  background-color: white;
  width: 90%;
  Height: 110%;
  border: 10px solid #FD7F20;
  padding: 25px;
  margin: auto;
  margin-top : 5%
  
}
</style>