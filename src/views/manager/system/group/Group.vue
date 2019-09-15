<template>
  <r-crud title="用户组" :children="children" :store="store"></r-crud>
</template>

<script>
import RCrud from "@/components/Crud/Crud";
// import users from "@/views/data/users";
import { getGroups, createGroup, deleteGroup, updateGroup } from "@/api/groups";
export default {
  components: {
    RCrud,
  },
  data() {
    return {
      children: [
        {
          label: "组名",
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
          return getGroups(params);
        },
        create(model) {
          return createGroup(model);
        },
        delete(model) {
          return deleteGroup(model.id);
        },
        edit(model) {
          return updateGroup(model.id, model);
        },
      },
    };
  },
};
</script>

<style></style>
