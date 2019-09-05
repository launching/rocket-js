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
export default {
  components: {
    RLocalTable,
  },
  data() {
    return {
      filter: {
        inline: true,
        children: [{ widget: "input", name: "name" }],
        toolbar: [
          "SEARCH",
          "CANCEL",
          {
            text: "创建",
            action: () => {
              this.$router.push({ name: "roleCreate" }).catch(e => {});
            },
          },
        ],
      },
      border: true,
      hightlightCurrentRow: true,
      fit: true,
      columns: [
        { label: "role", name: "name" },
        {
          type: "toolbar",
          label: "操作",
          children: [
            {
              text: "edit",
              size: "small",
              action: user => {
                this.$router.push({ name: "roleEdit" }).catch(e => {});
              },
            },
          ],
        },
      ],
      data() {
        return roles;
      },
    };
  },
};
</script>

<style></style>
