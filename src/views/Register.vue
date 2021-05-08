<!--หน้า register-->


<template>
  <div class="container">
    <h1>Register page</h1>
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
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  name: "register",
  data() {
    return {
      name:"",
      email: "",
      password: "",
      reenterPassword: "",
      db: firebase.firestore()
    };
  },
  
  methods: {
    register(){
      const user = firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          userCredential.user
            .updateProfile({
              displayName: this.name
            })
              this.db.collection("UserData").doc(userCredential.user.uid).set({
                  name:this.name,
                  role:'user'
              });
          this.$router.replace({path: "/Login"})
       })
        .catch((error) => {
          alert("Unable to register " + error.message);
        });
    },
  },
};
</script>

<style></style>
