<template>
  <r-crud title="用户组" :children="children" :store="store"></r-crud>
</template>

<script>
import RCrud from "@/components/Crud/Crud";
import users from "@/views/data/users";
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
        data() {
          return users;
        },
        create() {
          console.dir("create");
          return true;
        },
        delete() {
          console.dir("delete");
          return true;
        },
        edit() {
          console.dir("edit");
          return true;
        },
      },
    };
  },
};
</script>

<style></style>
