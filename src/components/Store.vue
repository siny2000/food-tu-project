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
          <tbody v-for="(order, index) in menuOrders" :key="index">
            <tr>
              <th>{{ index + 1 }}</th>
              <td>
                <a href="#" @click="gotoDetailPage(order)">{{
                  order.customerName
                }}</a>
              </td>
              <td>{{ computeElapsedTime(order.orderTime) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  name: "Store",
  data() {
    return {
      //ข้อมูลออร์เดอร์ที่ดึงไปโชว์บนลิสต์เมนู ถ้าเขียนส่วนดาต้าเบสได้แล้ว ดึงข้อมูลมาใส่เป็นอาเรย์แบบข้างล่างนี้เลย ส่วนโค้ดข้างบนจะวน for loop แสดงเอง
      product: [
        {
          name: "ผัดไข่เค็ม",
          numorder: 1,
          time: "00:00",
        },
        {
          name: "ผัดไข่เจียว",
          numorder: 2,
          time: "00:00",
        },
        {
          name: "ผัดไข่ต้ม",
          numorder: 3,
          time: "00:00",
        },
        {
          name: "ผัดไข่ดาว",
          numorder: 4,
          time: "00:00",
        },
      ],
      menuOrders: [],
      nowTime: Date.now(),
      interval: null,
    };
  },
  created() {
    this.initial();
    this.interval = setInterval(() => {
      this.nowTime = Date.now();
    }, 6000);
  },
  methods: {
    async initial() {
      const db = firebase.firestore();
      const user = await db
        .collection("UserData")
        .doc(this.user.data.uid)
        .get();
      var orders = await db
        .collection("Order")
        .where("restaurantRef", "==", user.data().restaurantRef)
        .where("status", "==", "Ordered")
        .orderBy("orderTime", "asc")
        .get();

      this.menuOrders = [];
      for (var i = 0; i < orders.docs.length; i++) {
        var customer = await orders.docs[i].data().userRef.get();
        this.menuOrders.push({
          id: orders.docs[i].id,
          customerName: customer.data().name,
          orderTime: orders.docs[i].data().orderTime,
        });
      }
    },
    convertMS(ms) {
      var d, h, m, s;
      s = Math.floor(ms / 1000);
      m = Math.floor(s / 60);
      s = s % 60;
      h = Math.floor(m / 60);
      m = m % 60;
      d = Math.floor(h / 24);
      h = h % 24;
      h += d * 24;
      s < 10 ? (s = `0${s}`) : (s = `${s}`);
      m < 10 ? (m = `0${m}`) : (m = `${m}`);
      h < 10 ? (h = `0${h}`) : (h = `${h}`);
      return h + ":" + m;
    },
    gotoDetailPage(order) {
      this.$router.replace({
        name: "MenuInfo",
        params: {
          order: order,
        },
      });
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
    computeElapsedTime: function() {
      var vm = this;
      return function(time) {
        return vm.convertMS(vm.nowTime - time.toDate());
      };
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
a:hover {
  color: #fd7f20;
  text-decoration: none;
}
.listordermenu {
  float: center;
  text-align: center;
  margin: 50px 200px;
}

.ordermenu {
  margin: 50px;
}

.table {
  background-color: #fdb750;
}
tbody:hover {
  background-color: white;
}
tbody:striped {
  background-color: white;
}
.thead-dark {
  background-color: #010100;
  color: white;
}
</style>
