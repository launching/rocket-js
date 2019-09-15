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
// import users from "@/views/data/users";
import { getUsers, deleteUser } from "@/api/users";
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
              this.$router.push({ name: "UserCreate" }).catch(e => {});
            },
          },
        ],
      },
      border: true,
      hightlightCurrentRow: true,
      fit: true,
      columns: [
        { label: "名字", name: "name" },
        { label: "角色", name: "role" },
        { label: "密码", name: "password" },
        { label: "年龄", name: "age" },
        {
          type: "toolbar",
          label: "操作",
          toolbar: [
            {
              text: "edit",
              size: "small",
              action: user => {
                this.$router
                  .push({ name: "UserEdit", query: { ...user } })
                  .catch(e => {});
              },
            },
            {
              text: "delete",
              size: "small",
              confirm: true,
              action: async user => {
                await deleteUser(user.id);
                this.$message.success(`${user.name}已经被删除`);
                this.$refs.table.refreshData();
              },
            },
          ],
        },
      ],
      data() {
        return getUsers();
      },
    };
  },
};
</script>

<style></style>
