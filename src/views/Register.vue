<!--หน้า register-->
<template>
  <div
    class="container text-center"
    style="padding-top:5%;padding-left:25%;padding-right:25%;"
  >
    <img src="../assets/newlogo.png" height="200px" w />
    <h1>Register</h1>
    <div class="row">
      <form @submit.prevent="register">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            id="fullname"
            required
            aria-describedby="emailHelp"
            v-model="name"
            placeholder="Full name"
          />
        </div>
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
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            id="reenterPassword1"
            required
            v-model="reenterPassword"
            placeholder="Confirm Password"
          />
          <div v-if="password != reenterPassword" class="text-danger">
            Passwords doesn't match
          </div>
        </div>
        <button v-if="!isLoading" type="submit" class="btn btn-primary">
          Register
        </button>
        <div v-if="isLoading" class="spinner-border text-primary" role="status">
          <span class="sr-only"></span>
        </div>
        <div style="margin-top:20px;">
          <a href="#" @click="gotoLogin()">Already have an account? Sign In.</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      reenterPassword: "",
      db: firebase.firestore(),
      isLoading: false,
    };
  },

  methods: {
    register() {
      this.isLoading = true;
      const user = firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          userCredential.user.updateProfile({
            displayName: this.name,
          });
          this.db
            .collection("UserData")
            .doc(userCredential.user.uid)
            .set({
              name: this.name,
              role: "user",
            });
          const actionCodeSetting = {
            url: "https://food-ab5af.web.app?verifyEmailComplete=true",
            handleCodeInApp: true,
          };
          userCredential.user
            .sendEmailVerification(actionCodeSetting)
            .then(() => {
              this.isLoading = false;
              alert("กรุณายืนยันอีเมลก่อนใช้งาน");
              this.$router.replace({
                path: "/",
                query: {
                  sendEmailVerification: true,
                },
              });
            })
            .catch((error) => {
              this.isLoading = false;
              alert(error);
            });
        })
        .catch((error) => {
          this.isLoading = false;
          alert("Unable to register " + error.message);
        });
    },
    gotoLogin() {
      this.$router.replace({ path: "/" });
    },
  },
};
</script>

<style></style>
