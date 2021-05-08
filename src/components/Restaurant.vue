<template>
  <div>
    <h1>{{ restaurant.name }}</h1>
    <img :src="restaurant.image" alt="restaurant image" width="400" />
    <p>โทร : {{ restaurant.phoneNumber }}</p>
    <div>
      <h2>Menu</h2>
      <div v-for="(item, index) in menus" :key="index">
        <img
          :src="item.image"
          alt="menu image"
          width="200"
          style="margin:20px;"
        />
        <span style="margin:20px;">ชื่อเมนู : {{ item.name }}</span>
        <span style="margin:20px;">ราคา : {{ item.price }} บาท</span>
        <span style="margin:20px;"
          ><button @click="addMenuToBasket(item)">เพิ่มลงตะกร้า</button></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  props: {
    restaurant: {
      type: Object,
    },
  },
  data() {
    return {
      menus: [],
    };
  },
  created() {
    this.initial();
  },
  methods: {
    async initial() {
      const storage = firebase.storage();
      for (var i = 0; i < this.restaurant.menu.length; i++) {
        const imageUrl = await storage
          .ref(this.restaurant.menu[i].image)
          .getDownloadURL();
        var tmpData = this.restaurant.menu[i];
        tmpData.image = imageUrl;
        tmpData.index = i;
        this.menus.push(tmpData);
      }
    },
    async addMenuToBasket(menuItem) {
      const db = firebase.firestore();
      const userRef = db.collection("UserData").doc(this.user.data.uid);
      const restaurantRef = db.collection("Restaurant").doc(this.restaurant.id);
      var order = await db
        .collection("Order")
        .where("userRef", "==", userRef)
        .where("restaurantRef", "==", restaurantRef)
        .get();
      if (order.docs.length > 0) {
        const isMenuExist = order.docs[0]
          .data()
          .menuList.filter((menu) => menu.menuIndex == menuItem.index);
        if (isMenuExist.length > 0) {
          const list = order.docs[0].data().menuList.map((menu) => {
            if (menu.menuIndex == menuItem.index) {
              menu.menuCount++;
            }
            return menu;
          });
          await order.docs[0].ref.update({
            menuList: list,
          });
        } else {
          await order.docs[0].ref.update({
            menuList: firebase.firestore.FieldValue.arrayUnion({
              menuIndex: menuItem.index,
              menuCount: 1,
            }),
          });
        }
      } else {
        await db.collection("Order").add({
          userRef: userRef,
          restaurantRef: restaurantRef,
          menuList: firebase.firestore.FieldValue.arrayUnion({
            menuIndex: menuItem.index,
            menuCount: 1,
          }),
          status: "NotOrdered",
        });
      }
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
