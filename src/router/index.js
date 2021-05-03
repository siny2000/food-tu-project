import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Store from "@/components/Store";
import UpdateMenu from "@/components/UpMenu";
// Import หน้าใหม่
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Verification from "@/components/Verification";
import User from "@/components/User";
import About from "@/components/About";
import FollowUs from "@/components/FollowUs";
import Team from "@/components/Team";
import Choosestore from "@/components/Choosestore";
import MenuInfo from "@/components/MenuInfo";

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
      path: "/MenuInfo",
      name: "MenuInfo",
      component: MenuInfo,
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
    {
      path: "/User",
      name: "User",
      component: User,
    },
    {
      path: "/Verification",
      name: "Verification",
      component: Verification,
    },
    {
      path: "/About",
      name: "About",
      component: About,
    },
    {
      path: "/FollowUs",
      name: "FollowUs",
      component: FollowUs,
    },
    {
      path: "/Team",
      name: "Team",
      component: Team,
    },
    {
      path: "/Choosestore",
      name: "Choosestore",
      component: Choosestore,
    }
  ]
});
