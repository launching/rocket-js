import Vue from "vue";
import Router from "vue-router";
import RVLogin from "@/views/Login";
import RVMajor from "@/views/major/index";
import RVUsers from "@/views/manager/system/user/Users";
import RVRoleContainer from "@/views/manager/system/role";
import RVRoles from "@/views/manager/system/role/Roles";
import RVRoleCreate from "@/views/manager/system/role/Create";
import RVRoleEdit from "@/views/manager/system/role/Edit";

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
          path: "users",
          name: "users",
          component: RVUsers,
        },
        {
          path: "role",
          component: RVRoleContainer,
          children: [
            {
              path: "/",
              name: "roles",
              component: RVRoles,
            },
            {
              path: "create",
              name: "roleCreate",
              component: RVRoleCreate,
            },
            {
              path: "edit",
              name: "roleEdit",
              component: RVRoleEdit,
            },
          ],
        },
      ],
    },
  ],
});
