import Vue from "vue";
import Router from "vue-router";
import RVLogin from "@/views/Login";
import RVMajor from "@/views/major/index";
import RouterView from "@/views/major/RouterView";
import RVUsers from "@/views/manager/system/user/Users";
import RVUserCreate from "@/views/manager/system/user/Create";
import RVUserEdit from "@/views/manager/system/user/Edit";
import RVRole from "@/views/manager/system/role/Role";
import RVGroup from "@/views/manager/system/group/Group";
import RVPermission from "@/views/manager/system/permission/Permission";

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
          path: "user",
          component: RouterView,
          props: { keep: true },
          children: [
            {
              path: "",
              name: "users",
              component: RVUsers,
            },
            {
              path: "create",
              name: "UserCreate",
              component: RVUserCreate,
            },
            {
              path: "edit",
              name: "UserEdit",
              component: RVUserEdit,
              props: route => {
                const query = route.query;
                query.roleId = parseInt(query.roleId);
                query.id = parseInt(query.id);
                query.age = parseInt(query.age);
                return query;
              },
            },
          ],
        },
        {
          path: "role",
          name: "roles",
          component: RVRole,
        },
        {
          path: "groups",
          name: "groups",
          component: RVGroup,
        },
        {
          path: "permissions",
          name: "permissions",
          component: RVPermission,
        },
      ],
    },
  ],
});
