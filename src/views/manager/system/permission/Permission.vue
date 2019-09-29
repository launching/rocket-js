<template>
  <r-crud title="权限" :children="children" :store="store"></r-crud>
</template>

<script>
import RCrud from "@/components/Crud/Crud";
import {
  getPermissions,
  createPermission,
  deletePermission,
  updatePermission,
} from "@/api/permissions";
export default {
  components: {
    RCrud,
  },
  data() {
    return {
      children: [
        {
          label: "名称",
          name: "name",
          widget: "input",
          validate: [
            {
              required: true,
              trigger: "blur",
            },
          ],
        },
      ],

      store: {
        data(params) {
          return getPermissions(params);
        },
        create(model) {
          return createPermission(model);
        },
        delete(model) {
          return deletePermission(model.id);
        },
        edit(model) {
          return updatePermission(model.id, model);
        },
      },
    };
  },
};
</script>

<style></style>
