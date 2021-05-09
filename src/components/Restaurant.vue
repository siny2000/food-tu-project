<template>
  <div>
    <div class="row">
      <div class="col-3">
        <h1 style="margin-left:10%;margin-top:5%;">{{ $route.query.name }}</h1>
        <img
          :src="$route.query.image"
          alt="restaurant image"
          width="400"
          class="image"
          style="margin-top:20p;margin-left:10%"
        />
        <h4 style="margin:10%;">โทร : {{ $route.query.phoneNumber }}</h4>
        <button
          type="button"
          class="btn btn-primary"
          style="margin:50px;"
          @click="$router.replace({ path: '/Choosestore' })"
        >
          <h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="30"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              /></svg
            >Back
          </h3>
        </button>
      </div>
      <div class="col-4">
        <div class="container text-center">
          <h2 style="margin-top:5%">Menu</h2>
        </div>
        <div
          v-for="(item, index) in menus"
          :key="index"
          style="background-color: #2596be; border: 2px; border-radius: 20px;margin-bottom:10px;"
        >
          <div class="row">
            <div class="col-4">
              <img
                :src="item.image"
                alt="menu image"
                width="200"
                style="margin:20px;"
                class="image"
              />
            </div>
            <div class="col-3">
              <p style="margin:20px;color:white;">ชื่อเมนู : {{ item.name }}</p>
            </div>
            <div class="col-2">
              <p style="margin:20px;color:white;">
                ราคา : {{ item.price }} บาท
              </p>
            </div>
            <div class="col-2">
              <button
                v-if="currentLoading != index"
                type="button"
                class="btn btn-success"
                @click="addMenuToBasket(item, index)"
                style="margin-top:20px;"
              >
                เพิ่มลงตะกร้า
              </button>
              <div
                v-else
                class="spinner-border text-success"
                role="status"
                style="margin-top:20px;margin-left:20px;"
              >
                <span class="sr-only"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-5" style="padding-top:1%;">
        <Basket></Basket>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import Basket from "./Basket";
import { bus } from "../main";
export default {
  components: {
    Basket,
  },
  data() {
    return {
      menus: [],
      currentLoading: -1,
      restaurant: null,
    };
  },
  created() {
    this.initial();
  },
  methods: {
    async initial() {
      const db = firebase.firestore();
      const storage = firebase.storage();
      const restaurantData = await db
        .collection("Restaurant")
        .doc(this.$route.query.id)
        .get();
      this.restaurant = restaurantData;
      for (var i = 0; i < restaurantData.data().menu.length; i++) {
        const imageUrl = await storage
          .ref(restaurantData.data().menu[i].image)
          .getDownloadURL();
        var tmpData = restaurantData.data().menu[i];
        tmpData.image = imageUrl;
        tmpData.index = i;
        this.menus.push(tmpData);
      }
    },
    async addMenuToBasket(menuItem, index) {
      this.currentLoading = index;
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
      this.currentLoading = -1;
      bus.$emit("AddMenu", menuItem);
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
    restaurantName() {
      return this.restaurant?.name ?? "Name";
    },
    restaurantPhoneNumber() {
      return this.restaurant?.phoneNumber ?? "phoneNumber";
    },
  },
};
</script>

<style scoped>
.image {
  border: 2px;
  border-radius: 25px;
}
</style>
