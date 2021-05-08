<!--หน้า Login-->

<template>
  <div class="container">
    <h1>Login page</h1>
    <div class="row">
      <form @submit.prevent="login">
        <div class="mb-3">
          <input
            type="email"
            class="form-control"
            id="email"
            required
            v-model="email"
            placeholder="Email"
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            id="password"
            required
            v-model="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          const db = firebase.firestore();
          db.collection("UserData")
            .doc(userCredential.user.uid)
            .get()
            .then((doc) => {
              if (doc.data().role == "shop") {
                this.$router.replace({ path: "/Store" });
              } else {
                this.$router.replace({ path: "/Choosestore" });
              }
            });
        })
        .catch((error) => {
          alert("Invalid username or password");
        });
    },
  },
};
</script>

<style></style>
