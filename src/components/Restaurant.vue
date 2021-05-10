<template>
  <div>
    <div class="row">
      <div class="col-3">
        
        <!--img
          :src="$route.query.image"
          alt="restaurant image"
          width="150"
          class="image"
          
        /-->
        <h1 style="margin-left:10%;margin-top:5%;">{{ $route.query.name }}</h1>
       
        <button
          type="button"
          class="btn btn-primary"
          style="margin:30px;padding-left:1%;"
          @click="$router.replace({ path: '/Choosestore' })"
        >
          <h3>
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
              Back
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
          :style="{
            backgroundColor: '#FFFFFF',
            border: '2px',
            borderRadius: '30px',
            marginBottom: '10px',
            height:'5cm',
            width:'12cm',
            display: item.status == 'Available' ? 'block' : 'none',
          }"
        >
          <div class="row">
            <div class="col-4">
              <img
                :src="item.image"
                alt="menu image"
                width="150"
                height="120"
                style="margin:10px;"
                class="image"
              />
            </div>
            <div class="col-3">
              <p >ชื่อเมนู : {{ item.name }}</p>
              <p >
                ราคา : {{ item.price }} บาท
              </p>
            </div>
            <div class="col-2">
              
            </div>
            <div class="col-2">
              <button
                v-if="currentLoading != index"
                type="button"
                class="btn btn-success"
                @click="addMenuToBasket(item, index)"
                
              >
                เพิ่มลงตะกร้า
              </button>
              <div
                v-else
                class="spinner-border text-success"
                role="status"
                style="margin-top:20px; margin-left:20px;"
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

h1{
  color: rgb(255, 255, 255);
  font-family: Georgia, Times, "Times New Roman", serif;
  font-size: 30px; 
  font-style: normal; 
  font-variant: normal; 
  font-weight: 700; 
  text-align: left;
  line-height: 26.4px;
  margin-top:10%;  
  margin-left:2%;
  text-shadow: rgb(155, 16, 16) 0.05em 0.05em ;



  
  
}
h3{
  font-family: cursive;
  font-weight: bold;
  text-align: center; 
  font-size: 20px;
  font-variant: normal; 
  color:rgb(255, 255, 255);
 
}

h2{
  font-family: cursive;
  font-weight: bold;
  text-align: center; 
  font-size: 20px;
  font-variant: normal; 
  color:rgb(255, 255, 255);
  border: none;
  cursor: pointer;
  background-color: rgb(0, 0, 0);
  border-radius: 15px;
  height: 30px;
  width: 420px;
 
}
button{
  margin: auto;
  height: 30px;
  width: 120px;
  top:69%;
  left: 45%;
  border: none;
  cursor: pointer;
  background-color: rgb(207, 0, 0);

  color: rgb(255, 255, 255);
  
  border-radius: 15px;
}
.col-2{
  margin: top 5px;; 
  margin-right: 25px;
  margin-left: 5%;
}
p{
  margin:auto;
  margin-top: 40%;
  width:300%;
  padding-right:30px;
  color:black;
}

</style>
