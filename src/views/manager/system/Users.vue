<template>
  <div>
    User
    <div>
      <r-local-table
        :filter="filter"
        :columns="columns"
        :data="data"
        border
        fit
        localPage
        ref="table"
      >
      </r-local-table>
    </div>
  </div>
</template>

<script>
import RLocalTable from "@/components/Table/LocalTable";
import users from "@/views/data/users";
export default {
  components: {
    RLocalTable,
  },
  data() {
    return {
      filter: {
        inline: true,
        children: [{ widget: "input", name: "name" }],
      },
      border: true,
      hightlightCurrentRow: true,
      fit: true,
      columns: [
        { label: "名字", name: "name" },
        { label: "角色", name: "role.name" },
      ],
      data() {
        return users;
      },
    };
  },
};
</script>

<style></style>
