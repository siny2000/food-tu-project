<template>
  <div class="store">
      <!--วางไว้ก่อนเดี๋ยวมาเขียนระบบลิสต์ของออเดอร์ -->
      <div class="listordermenu">
        <h1>Order List</h1>
        <div class="ordermenu">
          <table class="table table-striped table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col" width="200">Order Number</th>
                <th scope="col" width="400">Order Name</th>
                <th scope="col" width="200">Time</th>
              </tr>
            </thead>
            <!-- v-for คือวน for loop เอาข้อมูลใน data{product} ข้างล่างมาโชว์เป็นตาราง -->
            <tbody v-for="item in product">
              <tr>
                <th >{{item.numorder}}</th>
                <td ><router-link to="/MenuInfo">{{item.name}}</router-link></td>
                <td >{{item.time}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Store',
  data () {
    return{
      //ข้อมูลออร์เดอร์ที่ดึงไปโชว์บนลิสต์เมนู ถ้าเขียนส่วนดาต้าเบสได้แล้ว ดึงข้อมูลมาใส่เป็นอาเรย์แบบข้างล่างนี้เลย ส่วนโค้ดข้างบนจะวน for loop แสดงเอง
      product:[
        {
          name: "ผัดไข่เค็ม",
          numorder:1,
          time: "00:00",
        },
        {
          name: "ผัดไข่เจียว",
          numorder:2,
          time: "00:00",
        },
        {
          name: "ผัดไข่ต้ม",
          numorder:3,
          time: "00:00",
        },
        {
          name: "ผัดไข่ดาว",
          numorder:4,
          time: "00:00",
        }
      ]
    }
  }
}
</script>

<style scoped>

a{
  color : black;
  text-decoration: none;
}
a:hover{
  color : #FD7F20;
  text-decoration: none;
}
.listordermenu{
  float: center;
  text-align: center;
  margin: 50px 200px;
}

.ordermenu{
  margin: 50px;
}

.table{
  background-color : #FDB750;
}
tbody:hover{
  background-color : white;
}
tbody:striped{
  background-color : white
}
.thead-dark{
  background-color : #010100;
  color : white;
}
</style>
