<template>
  <div class="store">
      <!--วางไว้ก่อนเดี๋ยวมาเขียนระบบลิสต์ของออเดอร์ -->
      <div class="listordermenu">
        <h1>Order List</h1>
        <div class="ordermenu">
          <table class="table">
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
                <th scope="row">{{item.numorder}}</th>
                <td><router-link to="/">{{item.name}}</router-link></td>
                <td>{{item.time}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <router-link tag="button" to="/UpdateMenu">Go Check UpdateMenu page</router-link>
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
          active: false,
        },
        {
          name: "ผัดไข่เจียว",
          numorder:2,
          time: "00:00",
          active: false,
        },
        {
          name: "ผัดไข่ต้ม",
          numorder:3,
          time: "00:00",
          active: false,
        },
        {
          name: "ผัดไข่ดาว",
          numorder:4,
          time: "00:00",
          active: false,
        }
      ]
    }
  }
}
</script>

<style scoped>
img {
  border-radius: 50%;
  float: right;
}

.listordermenu{
  float: center;
  text-align: center;
  margin: 50px 200px;
}

.ordermenu{
  margin: 50px;
}
</style>
