import Vue from "vue";
import Router from "vue-router";
import RVLogin from "@/views/Login";
import RVMajor from "@/views/major/index";
import RVUsers from "@/views/manager/system/Users";
import RVRoles from "@/views/manager/system/Roles";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: RVLogin,
    },
    {
      path: "/major",
      component: RVMajor,
      children: [
        {
          path: "/users",
          name: "users",
          component: RVUsers,
        },
        {
          path: "/roles",
          name: "roles",
          component: RVRoles,
        },
      ],
    },
  ],
});
