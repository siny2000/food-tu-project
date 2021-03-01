import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Store from "@/components/Store";
import UpdateMenu from "@/components/UpMenu";
// Import หน้าใหม่
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

Vue.use(Router);

export default new Router({
  // Mode ที่เพิ่มมาเพื่อให้ path ของเว็บไม่มี # มาแทรก ex. localhost/#/Store ---> localhost/Store
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
    },
    {
      path: "/Store",
      name: "Store",
      component: Store,
    },
    {
      path: "/UpdateMenu",
      name: "UpdateMenu",
      component: UpdateMenu,
    },
    {
      // เพิ่ม Path for Login and register
      path: "/Login",
      name: "Login",
      component: Login,
    },
    {
      path: "/Register",
      name: "Register",
      component: Register,
    },
  ],
});
