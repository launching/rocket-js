<template>
  <div>
    Roles
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
import roles from "@/views/data/roles";
console.dir(roles);
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
      columns: [{ label: "role", name: "name" }],
      data() {
        return roles;
      },
    };
  },
};
</script>

<style></style>
