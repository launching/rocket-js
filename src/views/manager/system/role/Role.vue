<template>
  <r-crud
    title="Role"
    :children="children"
    :store="store"
    :dialog="true"
  ></r-crud>
</template>

<script>
import RCrud from "@/components/Crud/Crud";
import { getRoles, createRole, deleteRole, updateRole } from "@/api/roles";

// import roles from "@/views/data/roles";
export default {
  components: {
    RCrud,
  },
  data() {
    return {
      children: [
        {
          label: "名字",
          name: "name",
          widget: "input",
          validate: [
            {
              required: true,
              trigger: "blur",
            },
          ],
        },
        {
          label: "permissions",
          format(row) {
            console.dir(row);
            return row;
          },
        },
      ],

      store: {
        data(params) {
          return getRoles(params);
        },
        create(model) {
          return createRole(model);
        },
        delete(model) {
          return deleteRole(model.id);
        },
        edit(model) {
          return updateRole(model.id, model);
        },
      },
    };
  },
  methods: {},
};
</script>

<style></style>
