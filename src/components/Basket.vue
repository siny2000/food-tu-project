<template>
  <div>
    <h1>ตะกร้าของฉัน</h1>
    <div v-for="(restaurant, index) in allRestaurant" :key="index">
      <span style="margin:20px;">ชื่อร้าน : {{ restaurant.name }}</span>
      <span style="margin:20px;">โทร : {{ restaurant.phoneNumber }}</span>
      <span style="margin:20px;"
        >สถานะ : {{ restaurantStatus(restaurant.orderStatus) }}</span
      >
      <span>
        <button
          v-if="restaurant.orderStatus == 'NotOrdered'"
          @click="takeOrder(restaurant)"
        >
          สั่งอาหาร
        </button>
      </span>

      <ul>
        <li v-for="(menu, index) in restaurant.orderMenuList" :key="index">
          <img
            style="margin:10px;"
            :src="menu.imageUrl"
            alt="menu image"
            width="50"
          />
          <span style="margin:10px;">ชื่อเมนู : {{ menu.name }}</span>
          <span style="margin:10px;">ราคา : {{ menu.price }}</span>
          <span style="margin:10px;">จำนวน : {{ menu.menuCount }}</span>
          <span
            v-if="restaurant.orderStatus == 'NotOrdered'"
            style="margin:10px;"
            ><button
              @click="decreaseMenu(restaurant, restaurant.orderMenuList, menu)"
            >
              -1
            </button></span
          >
          <span
            v-if="restaurant.orderStatus == 'NotOrdered'"
            style="margin:10px;"
            ><button
              @click="increaseMenu(restaurant, restaurant.orderMenuList, menu)"
            >
              +1
            </button></span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      allRestaurant: [],
      orderStatus: null,
    };
  },
  created() {
    this.initial();
  },
  methods: {
    async initial() {
      const db = firebase.firestore();
      const userRef = db.collection("UserData").doc(this.user.data.uid);
      const orders = await db
        .collection("Order")
        .where("userRef", "==", userRef)
        .get();
      this.allRestaurant = [];
      for (var i = 0; i < orders.docs.length; i++) {
        var restaurant = await orders.docs[i].data().restaurantRef.get();
        restaurant = restaurant.data();
        restaurant.orderStatus = orders.docs[i].data().status;
        restaurant.id = orders.docs[i].id;

        var orderMenuList = orders.docs[i].data().menuList.map((menu) => {
          var tmpData = restaurant.menu[menu.menuIndex];
          tmpData.menuCount = menu.menuCount;
          tmpData.menuIndex = menu.menuIndex;
          return tmpData;
        });
        for (var j = 0; j < orderMenuList.length; j++) {
          var imageUrl = await firebase
            .storage()
            .ref(orderMenuList[j].image)
            .getDownloadURL();
          orderMenuList[j].imageUrl = imageUrl;
        }
        restaurant.orderMenuList = orderMenuList;
        this.allRestaurant.push(restaurant);
      }
    },
    restaurantStatus(status) {
      if (status == "NotOrdered") {
        return "ยังไม่ได้สั่ง";
      } else if (status == "Ordered") {
        return "ร้านค้ากำลังดำเนินการ";
      } else if (status == "NotFinished") {
        return "ยังไม่เสร็จ";
      }
    },
    async decreaseMenu(orderRestaurant, orderMenuList, menu) {
      const db = firebase.firestore();
      if (menu.menuCount > 1) {
        var menuList = orderMenuList.map((menuItem) => {
          if (
            menuItem.menuCount == menu.menuCount &&
            menuItem.menuIndex == menu.menuIndex
          ) {
            menuItem.menuCount--;
          }
          return {
            menuCount: menuItem.menuCount,
            menuIndex: menuItem.menuIndex,
          };
        });
        console.log(menuList);
        await db
          .collection("Order")
          .doc(orderRestaurant.id)
          .update({
            menuList: menuList,
          });
        this.initial();
      } else {
        if (orderMenuList.length <= 1) {
          await db
            .collection("Order")
            .doc(orderRestaurant.id)
            .delete();
        } else {
          await db
            .collection("Order")
            .doc(orderRestaurant.id)
            .update({
              menuList: firebase.firestore.FieldValue.arrayRemove({
                menuCount: menu.menuCount,
                menuIndex: menu.menuIndex,
              }),
            });
        }

        this.initial();
      }
    },
    async increaseMenu(orderRestaurant, orderMenuList, menu) {
      const db = firebase.firestore();
      var menuList = orderMenuList.map((menuItem) => {
        if (
          menuItem.menuCount == menu.menuCount &&
          menuItem.menuIndex == menu.menuIndex
        ) {
          menuItem.menuCount++;
        }
        return {
          menuCount: menuItem.menuCount,
          menuIndex: menuItem.menuIndex,
        };
      });
      console.log(menuList);
      await db
        .collection("Order")
        .doc(orderRestaurant.id)
        .update({
          menuList: menuList,
        });
      this.initial();
    },
    async takeOrder(restaurant) {
      const db = firebase.firestore();
      await db
        .collection("Order")
        .doc(restaurant.id)
        .update({
          status: "Ordered",
          orderTime: firebase.firestore.FieldValue.serverTimestamp(),
        });
      this.initial();
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>

<style></style>
