<template>
  <div class="main">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <h1>Order Information</h1>
          <div class="orderinfo">
            <div class="infocontainer">
              <ol>
                <li v-for="(menu, index) in orderMenuList" :key="index">
                  <img
                    style="margin:10px;"
                    :src="menu.imageUrl"
                    alt="menu image"
                    width="50"
                  />
                  <span style="margin:10px;">ชื่อเมนู : {{ menu.name }}</span>
                  <span style="margin:10px;">ราคา : {{ menu.price }} บาท</span>
                  <span style="margin:10px;">จำนวน : {{ menu.menuCount }}</span>
                </li>
              </ol>
            </div>
          </div>

          <div v-if="orderStatus == 'Ordered'" class="buttons">
            <button
              type="button"
              class="btn btn-warning"
              id="savebutton"
              @click="sendOrder"
            >
              จัดส่ง
            </button>
          </div>
          <span v-else-if="orderStatus == 'Travelling'"
            >สถานะ : อยู่ระหว่างจัดส่ง</span
          >
          <h1>Order From</h1>
          <div class="orderfrom">
            <div class="fromcontainer">
              {{ order.customerName }}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="chat">
            <div
              v-for="(message, index) in chatMessage"
              :key="index"
              :style="{
                color: message.uid == user.data.uid ? 'green' : 'yellow',
              }"
            >
              {{
                message.uid == user.data.uid
                  ? message.message
                  : message.name + " : " + message.message
              }}
            </div>
          </div>

          <div>
            <input
              ref="chatText"
              type="text"
              name="chatText"
              id="chatText"
              width="100%"
            />
            <button @click="sendMessage">ส่ง</button>
          </div>
        </div>
        <div class="col-md-3">
          <router-link to="/Store"
            ><div class="buttons">
              <button type="button" class="btn btn-info" id="backbutton">
                BACK
              </button>
            </div></router-link
          >
        </div>
        <div class="col-md-3">
          <router-link to="/Store"
            ><div class="buttons">
              <button type="button" class="btn btn-warning" id="savebutton">
                SAVE
              </button>
            </div></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  props: {
    order: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      orderMenuList: [],
      orderStatus: "",
      chatMessage: [],
    };
  },
  created() {
    this.initial();
  },
  methods: {
    async initial() {
      const db = firebase.firestore();
      db.collection("Order")
        .doc(this.order.id)
        .onSnapshot((snapShot) => {
          if (snapShot.data().chatMessage) {
            this.chatMessage = snapShot.data().chatMessage;
          }
        });
      var orders = await db
        .collection("Order")
        .doc(this.order.id)
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
        .doc(this.order.id)
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
        .doc(this.order.id)
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
  margin: 25px;
}
.orderfrom {
  float: left;
  background-color: #fdb750;
  width: 100%;
  border: 10px solid #fd7f20;
  padding: 25px;
  margin: 25px;
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
}
</style>
