<template>
  <div class="main">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <button
            type="button"
            class="btn btn-primary"
            style="margin-top:10px;"
            @click="
              () => {
                if (user.data.role == 'shop') {
                  $router.replace({ path: '/Store' });
                } else {
                  $router.replace({ path: '/Basket' });
                }
              }
            "
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
          <h1>Order Information</h1>
          <div class="orderinfo container text-center">
            <div class="infocontainer" style="width:100%;">
              <ul class="list-group">
                <li
                  class="list-group-item"
                  v-for="(menu, index) in orderMenuList"
                  :key="index"
                >
                  <div class="row">
                    <div class="col">
                      <img
                        style="margin:10px;"
                        :src="menu.imageUrl"
                        alt="menu image"
                        width="70"
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
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div
            v-if="orderStatus == 'Ordered' && userRole == 'shop'"
            class="buttons"
          >
            <button
              type="button"
              class="btn btn-warning"
              id="savebutton"
              @click="sendOrder"
            >
              <h5 style="color:white;">จัดส่ง</h5>
            </button>
          </div>
          <div
            v-else-if="orderStatus == 'Travelling'"
            style="padding-left:40%;"
          >
            <h5>สถานะ : อยู่ระหว่างจัดส่ง</h5>
          </div>
          <h1>Order From</h1>
          <div class="orderfrom">
            <div class="fromcontainer">
              <h3 style="color:white">{{ $route.query.name }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="chat">
            <div v-for="(message, index) in chatMessage" :key="index">
              <div
                v-if="message.uid == user.data.uid"
                class="d-flex flex-row-reverse"
              >
                <div
                  style="background-color:#fd7f20;color:white;border: 2px;
  border-radius: 5px;margin:5px;padding:5px"
                >
                  {{ message.message }}
                </div>
              </div>
              <div v-else class="d-flex flex-row">
                <div
                  style="background-color:#bdbdbd;color:black;border: 2px;
  border-radius: 5px;margin:5px;padding:5px"
                >
                  {{ message.message }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="input-group mb-3"
            style="padding-left:5%;padding-right:5%;margin-top:10px;"
          >
            <input
              ref="chatText"
              type="text"
              class="form-control"
              placeholder="Type message here..."
              aria-label="Send message here..."
              aria-describedby="button-addon2"
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              @click="sendMessage()"
            >
              Send
            </button>
          </div>
        </div>
        <div class="col-md-3"></div>
        <!-- <div class="col-md-3">
          <router-link to="/Store"
            ><div class="buttons">
              <button type="button" class="btn btn-warning" id="savebutton">
                SAVE
              </button>
            </div></router-link
          >
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import { bus } from "../main";
export default {
  props: {
    order: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      orderMenuList: [],
      orderStatus: "",
      chatMessage: [],
      userRole: "",
    };
  },
  created() {
    this.initial();
    bus.$on("UserRoleUpdate", (data) => {
      console.log("UserRoleHasBeenUpdated");
      this.userRole = data;
    });
  },
  methods: {
    async initial() {
      const db = firebase.firestore();
      db.collection("Order")
        .doc(this.$route.query.id)
        .onSnapshot((snapShot) => {
          if (snapShot?.data()?.chatMessage) {
            this.chatMessage = snapShot.data().chatMessage;
          }
        });
      var orders = await db
        .collection("Order")
        .doc(this.$route.query.id)
        .get();
      var restaurant = await orders.data().restaurantRef.get();
      this.orderStatus = orders.data().status;
      this.orderMenuList = [];
      var userData = await orders.data().userRef.get();
      this.costomerName = userData.name;
      for (var i = 0; i < orders.data().menuList.length; i++) {
        var imageUrl = await firebase
          .storage()
          .ref(
            restaurant.data().menu[orders.data().menuList[i].menuIndex].image
          )
          .getDownloadURL();
        this.orderMenuList.push({
          name: restaurant.data().menu[orders.data().menuList[i].menuIndex]
            .name,
          menuCount: orders.data().menuList[i].menuCount,
          menuIndex: orders.data().menuList[i].menuIndex,
          imageUrl: imageUrl,
          price: restaurant.data().menu[orders.data().menuList[i].menuIndex]
            .price,
        });
      }
    },
    async sendMessage() {
      const db = firebase.firestore();
      await db
        .collection("Order")
        .doc(this.$route.query.id)
        .update({
          chatMessage: firebase.firestore.FieldValue.arrayUnion({
            name: this.user.data.displayName,
            uid: this.user.data.uid,
            message: this.$refs.chatText.value,
            sendTime: Date.now(),
          }),
        });
      this.$refs.chatText.value = "";
    },
    async sendOrder() {
      const db = firebase.firestore();
      await db
        .collection("Order")
        .doc(this.$route.query.id)
        .update({
          status: "Travelling",
        });
      this.initial();
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
    displayChatMessageList() {
      this.chatMessage.sort(function(a, b) {
        return a.sentTime - b.sentTime;
      });
      return this.chatMessage;
    },
  },
};
</script>

<style scoped>
h1 {
  margin-top: 5%;
}
.orderinfo {
  float: left;
  margin-top: 10%;
  background-color: #fdb750;
  width: 100%;
  border: 10px solid #fd7f20;
  padding: 25px;
  margin: 15px;
  height: 35%;
  overflow-y: scroll;
}
.orderfrom {
  float: left;
  background-color: #fdb750;
  width: 100%;
  border: 10px solid #fd7f20;
  padding: 15px;
  margin: 15px;
}
.infocontainer {
  float: left;
}
.fromcontainer {
  float: left;
}
.chatbox {
  float: right;
}
.buttons {
  width: 10%;
  margin: auto;
  margin-top: auto;
}
.chat {
  float: center;
  background-color: white;
  width: 90%;
  height: 110%;
  border: 10px solid #fd7f20;
  padding: 25px;
  margin: auto;
  margin-top: 5%;
  height: 70%;
  overflow-y: scroll;
}
.image {
  border: 2px;
  border-radius: 10px;
}
</style>
