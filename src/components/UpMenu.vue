<template>
  <div class="main">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="container text-center">
            <h1 style="margin-top:1%">Menu</h1>
          </div>
          <div
            v-for="(item, index) in menus"
            :key="index"
            style="background-color: white; border: 2px; border-radius: 20px;margin-bottom:10px;"
          >
            <div class="row">
              <div class="col-3">
                <img
                  :src="item.image"
                  alt="menu image"
                  width="200"
                  style="margin:20px;"
                  class="image"
                />
              </div>
              <div class="col-3" style="margin:auto;">
                <p style="margin:20px;color:black;">
                  ชื่อเมนู : {{ item.name }}
                </p>
              </div>
              <div class="col-2" style="margin:auto;">
                <p style="margin:20px;color:black;">
                  ราคา : {{ item.price }} บาท
                </p>
              </div>
              <div class="col-4" style="margin:auto;">
                <span>สถานะ : </span>
                <span v-if="item.status == 'Available'" style="color:green;"
                  >เปิดขาย</span
                >
                <span v-else style="color:red;">ไม่เปิดขาย</span>
                <span
                  v-if="item.status == 'Available'"
                  style="margin-left:25px;"
                  ><button
                    v-if="currentLoading != index"
                    type="button"
                    class="btn btn-danger"
                    @click="closeMenu(item, index)"
                    style="width:200px;"
                  >
                    ปิดการขาย
                  </button>
                  <div
                    v-else
                    class="spinner-border text-success"
                    role="status"
                    style="margin-top:20px;margin-left:20px;"
                  >
                    <span class="sr-only"></span>
                  </div>
                </span>
                <span v-else style="margin-left:25px;"
                  ><button
                    v-if="currentLoading != index"
                    type="button"
                    class="btn btn-success"
                    @click="openMenu(item, index)"
                    style="width:200px;"
                  >
                    เปิดการขาย
                  </button>
                  <div
                    v-else
                    class="spinner-border text-success"
                    role="status"
                    style="margin-top:20px;margin-left:20px;"
                  >
                    <span class="sr-only"></span>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import { bus } from "../main";
export default {
  name: "UpdateMenu",
  data() {
    return {
      menus: [],
      currentLoading: -1,
      restaurantData: {},
    };
  },
  created() {
    this.initial();
    bus.$on("UserRoleUpdate", (data) => {
      console.log("UserRoleHasBeenUpdated");
      this.initial();
    });
  },
  methods: {
    async initial() {
      if (this.user.data) {
        const db = firebase.firestore();
        var userData = await db
          .collection("UserData")
          .doc(this.user.data?.uid)
          .get();
        var restaurant = await userData.data()?.restaurantRef.get();
        this.restaurantData = restaurant.data();
        this.restaurantData.id = restaurant.id;
        this.menus = [];
        for (var i = 0; i < restaurant?.data()?.menu.length; i++) {
          var tmpMenuData = {};
          tmpMenuData = restaurant?.data()?.menu[i];
          const imageUrl = await firebase
            .storage()
            .ref(restaurant?.data()?.menu[i].image)
            .getDownloadURL();
          tmpMenuData.image = imageUrl;
          this.menus.push(tmpMenuData);
        }
      }
    },
    async openMenu(menu, index) {
      const db = firebase.firestore();
      this.currentLoading = index;
      var newMenuList = this.restaurantData.menu.map((menuItem, indexItem) => {
        if (indexItem == index) {
          menuItem.status = "Available";
        }
        return menuItem;
      });
      await db
        .collection("Restaurant")
        .doc(this.restaurantData.id)
        .update({
          menu: newMenuList,
        });
      menu.status = "Available";
      this.currentLoading = -1;
    },
    async closeMenu(menu, index) {
      const db = firebase.firestore();
      this.currentLoading = index;
      var newMenuList = this.restaurantData.menu.map((menuItem, indexItem) => {
        if (indexItem == index) {
          menuItem.status = "NotAvailable";
        }
        return menuItem;
      });
      await db
        .collection("Restaurant")
        .doc(this.restaurantData.id)
        .update({
          menu: newMenuList,
        });
      menu.status = "NotAvailable";
      this.currentLoading = -1;
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>

<style scoped>
.container {
  margin: auto;
}
.addonlist {
  margin: 20px;
}
.menulist {
  margin: 20px;
}
.largecheck {
  width: 20px;
  height: 20px;
}
.buttons {
  width: 200px;
  margin: auto;
  margin-top: 100px;
}
.table {
  background-color: white;
}
tbody:striped {
  background-color: #fdb750;
}
.thead-dark {
  background-color: #010100;
  color: white;
}
</style>
