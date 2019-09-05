<template>
  <div>
    User
    <el-dialog :visible.sync="status.create">
      <user-create
        @onSubmit="close('create')"
        @onCancel="close('create')"
      ></user-create>
    </el-dialog>
    <el-dialog :visible.sync="status.edit">
      <user-edit
        :user="selectUser"
        @onSubmit="close('edit')"
        @onCancel="close('edit')"
      ></user-edit>
    </el-dialog>
    <div>
      <r-local-table
        ref="table"
        :filter="filter"
        :columns="columns"
        :data="data"
        border
        fit
        localPage
      >
      </r-local-table>
    </div>
  </div>
</template>

<script>
import RLocalTable from "@/components/Table/LocalTable";
import UserCreate from "./Create";
import UserEdit from "./Edit";
import users from "@/views/data/users";
export default {
  components: {
    RLocalTable,
    UserCreate,
    UserEdit,
  },
  data() {
    return {
      status: {
        create: false,
        edit: false,
      },
      selectUser: {},
      filter: {
        inline: true,
        children: [{ widget: "input", name: "name" }],
        toolbar: [
          "SEARCH",
          "CANCEL",
          {
            text: "创建",
            action: () => {
              this.status.create = true;
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
        {
          label: "操作",
          type: "toolbar",
          children: [
            {
              text: "Edit",
              size: "small",
              action: user => {
                this.selectUser = user;
                this.status.edit = true;
              },
            },
          ],
        },
      ],
      data() {
        return users;
      },
    };
  },
  methods: {
    open(type) {
      this.status[type] = true;
    },
    close(type) {
      this.status[type] = false;
    },
  },
};
</script>

<style></style>
