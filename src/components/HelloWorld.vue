<template>
  <div class="main" >
    <img src="../assets/food tu.png" height="150 px" style="margin-top:2%;margin-left:85%;"/>
    <h1 id="welcome">{{ msg }}</h1>
    <h2 v-if="$route.query.verifyEmailComplete" style="color:green;">
      Verify Email Complete .
    </h2>
    <h2>Please Sign In</h2>

    <!-- เลือก login หรือ register -->
    <!-- <div class="login"><router-link to="/Login">Login</router-link></div>
    <br />
    <div class="register">
      <router-link to="/Register">Register</router-link>
    </div> -->

    <!-- ปล. มันยังเป็นแค่ลิ้งค์ ถ้าว่างก็หาวิธีใส่ปุ่มให้หน่อยนะ -->
    <div style="width:100%;padding-left:40%;padding-right:40%;">
      <form @submit.prevent="login">
        <div class="mb-3">
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
            v-model="email"
            placeholder="Email address"
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            required
            v-model="password"
            placeholder="Password"
          />
        </div>
        <button v-if="!isLoading" type="submit" class="btn btn-primary">
          Sign In
        </button>
        <div v-if="isLoading" class="spinner-border text-primary" role="status">
          <span class="sr-only"></span>
        </div>
        <div style="margin-top:20px;">
          <a href="#" @click.prevent="gotoRegister()"
            >Don't have an account? Register.</a
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Food TU ",
      isLoading: false,
      email: "",
      password: "",
    };
  },
  methods: {
    gotoRegister() {
      this.$router.push({ path: "/Register" });
    },
    login: function() {
      this.isLoading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          if (!userCredential.user.emailVerified) {
            alert("กรุณายืนยันอีเมลก่อนเข้าใช้งาน !");
            this.isLoading = false;
          } else {
            const db = firebase.firestore();
            db.collection("UserData")
              .doc(userCredential.user.uid)
              .get()
              .then((doc) => {
                this.isLoading = false;
                if (doc.data().role == "shop") {
                  this.$router.replace({ path: "/Store" });
                } else {
                  this.$router.replace({ path: "/Choosestore" });
                }
              });
          }
        })
        .catch((error) => {
          this.isLoading = false;
          alert("Invalid username or password");
        });
    },
  },
};
</script>

<style scoped>


.main {
  background-image: url('../assets/bg.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 120% 120%;
  text-align: center;
  height: 800px;
}
h1{
  color: rgb(19, 13, 99);
  font-family: Georgia, Times, "Times New Roman", serif;
  font-size: 54px; 
  font-style: normal; 
  font-variant: normal; 
  font-weight: 700; 
  line-height: 26.4px;
  text-shadow: rgb(171, 214, 255) 0.08em 0.08em ;

}

h2{
  margin-top: 3%;
  font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace; 
  font-size: 20px; 
  font-style: normal;
  font-variant: normal; 
  font-weight: 900; 
  line-height: 26.4px;
  color: rgb(255, 8, 0);
  
}
a{
  font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace; 
  font-size: 15px; 
  font-style: normal;
  font-variant: normal; 
  font-weight: 900; 
  line-height: 26.4px;
  color: rgb(255, 8, 0);
}
button{
  background-color: rgb(255, 86, 19);
  padding-left:40%;
  padding-right:40%;

}

</style>
