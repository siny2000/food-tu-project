<template>
  <div class="container-fluid mainDiv">
    <!-- search bar(เผลอทำแต่มันไม่ได้ใช้) -->
    <div class="Choosestore">
      <h1>Food</h1>
      <!-- <div id="searchWrapper"> -->
      <center>
        <img src="../assets/exlogofood.png" weight="100px" height="100px" />
      </center>
      <!-- <br />
        <input
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="search for a food"
        /> -->
      <!-- </div> -->
      <!-- <ul id="foodList"></ul> -->
    </div>
    <div class="row">
      <div class="column" v-for="(item, index) in restaurants" :key="index">
        <img :src="item.image" width="300" @click="gotoRestaurant(item)" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Choosestore",
  data() {
    return {
      restaurants: [],
      name: ["xxx", "yyy"],
    };
  },
  created() {
    this.initial();
  },
  methods: {
    async initial() {
      const db = firebase.firestore();
      const querySnapshot = await db
        .collection("Restaurant")
        .where("status", "==", "Opened")
        .get();
      const storage = firebase.storage();
      for (var i = 0; i < querySnapshot.docs.length; i++) {
        const imageUrl = await storage
          .ref(querySnapshot.docs[i].data().image)
          .getDownloadURL();
        var tmpData = querySnapshot.docs[i].data();
        tmpData.image = imageUrl;
        tmpData.id = querySnapshot.docs[i].id;
        this.restaurants.push(tmpData);
      }
    },
    gotoRestaurant(restaurant) {
      this.$router.push({
        name: "Restaurant",
        params: { restaurant: restaurant },
      });
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.column {
  float: left;
  width: 30%;
  padding: 55px;
}

/* Clear floats after image containers */
.row::after {
  content: "";
  clear: both;
  display: table;
}

.store {
  width: 40%;
  float: left;
  display: table;
}
.show {
  width: 50%;
  float: left;
}

img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 20px;
  color: rgb(252, 252, 252);
}

.image {
  width: 100%;
  padding: 5%;
  margin: 0 5px;
  float: right;
  text-align: center;
  line-height: 50px;
  transition: all 0.2s ease-in-out;
}

.column img:hover {
  transform: scale(1.1);
  transition: 0.5s;
}

body {
  height: 100%;
  font-family: sans-serif;
  background-color: #111d4a;
}

* {
  box-sizing: border-box;
}
h1 {
  color: #eee;
  margin-bottom: 30px;
}
.Choosestore {
  padding: 40px;
  margin: 0 auto;
  max-width: 1000px;
  text-align: center;
}

#foodList {
  padding-inline-start: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 20px;
}

#searchBar {
  width: 100%;
  height: 32px;
  border-radius: 3px;
  border: 1px solid #eaeaea;
  padding: 5px 10px;
  font-size: 12px;
}

#searchWrapper {
  position: relative;
}

#searchWrapper::after {
  content: "🔍";
  position: absolute;
  top: 100px;
  right: 15px;
}
.mainDiv {
  font-family: sans-serif;
  background-color: #111d4a;
  min-height: 100%;
  height: 100%;
}
</style>
