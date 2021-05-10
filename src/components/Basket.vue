<template>
  <div>
    <div class="row text-center">
      <h2>My Order</h2>
    </div>
    <div class="container text-center ">
      <div
        v-for="(restaurant, index) in allRestaurant"
        :key="index"
        class="card"
        style="width:100%;margin:10px;"
      >
        <div class="card-header">
          <div class="row">
            <div class="col">
              <p style="margin:20px;width:100%;">ชื่อร้าน : {{ restaurant.name }}</p>
            </div>
            <div class="col">
              <p style="margin:20px;width:100%;">โทร : {{ restaurant.phoneNumber }}</p>
            </div>
            <div class="col">
              <p style="margin:20px;width:100%;padding-right:10px;">
                สถานะ : {{ restaurantStatus(restaurant.orderStatus) }}
              </p>
            </div>
            <div v-if="restaurant.orderStatus != 'NotOrdered'" class="col">
              <button
                @click="gotoMenuInfo(restaurant)"
                class="btn btn-dark"
                style="margin-top:10px;margin-left:30px;"
              >
                แชทกับร้าน
              </button>
            </div>
            <div class="col">
              <button
                v-if="restaurant.orderStatus == 'NotOrdered'"
                @click="takeOrder(restaurant)"
                class="btn btn-primary"
                style="margin-top:10px;margin-left:auto"
              >
                สั่งอาหาร
              </button>
              <button
                v-if="restaurant.orderStatus == 'Travelling'"
                @click="confirmReceive(restaurant)"
                class="btn btn-primary"
                style="margin-top:10px"
              >
                ยืนยันรับอาหารเรียบร้อย
              </button>
            </div>
          </div>
        </div>
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="(menu, index) in restaurant.orderMenuList"
            :key="index"
          >
            <div class="row">
              <div class="col">
                <img
                  style="margin:10px;"
                  :src="menu.imageUrl"
                  alt="menu image"
                  width="100"
                  class="image"
                />
              </div>
              <div class="col">
                <p style="margin:10px;">ชื่อเมนู : {{ menu.name }}</p>
              </div>
              <div class="col">
                <p style="margin:10px;">ราคา : {{ menu.price }} บาท</p>
              </div>
              <div class="col">
                <p style="margin:10px;">จำนวน : {{ menu.menuCount }}</p>
              </div>
              <div class="col">
                <span
                  v-if="restaurant.orderStatus == 'NotOrdered'"
                  style="margin:10px;"
                  ><button
                    @click="
                      decreaseMenu(restaurant, restaurant.orderMenuList, menu)
                    "
                    class="btn btn-danger" 
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-dash-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"
                      />
                    </svg></button
                ></span><p></p>
                <span
                  v-if="restaurant.orderStatus == 'NotOrdered'"
                  style="margin:10px;"
                  ><button
                    @click="
                      increaseMenu(restaurant, restaurant.orderMenuList, menu)
                    "
                    class="btn btn-success"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-plus-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                      />
                    </svg></button
                ></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import { bus } from "../main";
export default {
  data() {
    return {
      allRestaurant: [],
    };
  },
  created() {
    this.initial();
    bus.$on("UserRoleUpdate", (data) => {
      console.log("UserRoleHasBeenUpdated");
      this.initial();
    });
    bus.$on("AddMenu", (data) => {
      console.log("MenuHasBeenAdded");
      this.initial();
    });
  },
  methods: {
    async initial() {
      const db = firebase.firestore();
      const userRef = db.collection("UserData").doc(this.user.data?.uid);
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
      } else if (status == "Travelling") {
        return "อยู่ระหว่างจัดส่ง";
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
    async confirmReceive(order) {
      const db = firebase.firestore();
      await db
        .collection("Order")
        .doc(order.id)
        .delete();
      this.initial();
    },
    gotoMenuInfo(restaurant) {
      this.$router.replace({
        name: "MenuInfo",
        params: {
          order: {
            id: restaurant.id,
            customerName: this.user.data.displayName,
          },
        },
        query: {
          id: restaurant.id,
          name: this.user.data?.displayName,
        },
      });
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>

<style>
.image {
  border: 2px;
  border-radius: 10px;
}

h2{
  margin-top: 2%;
  font-family: cursive;
  font-weight: bold;
  text-align: center; 
  font-size: 30px;
  font-variant: normal; 
  color:rgb(53, 37, 146);
 text-shadow: rgb(255, 255, 255) 0.08em 0.08em ;
  border: none;
  cursor: pointer;
  border-radius: 15px;
  height: 30px;


 
}
</style>
