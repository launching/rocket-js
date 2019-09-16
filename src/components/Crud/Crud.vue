<template>
  <div class="r-crud">
    <div class="title">
      {{ !dialog && dialogFormVisible ? dialogTitle : title }}
    </div>
    <div class="content">
      <div class="form-content">
        <el-dialog
          v-if="dialog"
          :title="dialogTitle"
          :visible="dialogFormVisible"
          :width="targetDialogWidth"
          @close="dialogClose"
        >
          <r-form
            :label-width="formLabelWidth"
            :label-position="formLabelPosition"
            :children="formChildren"
            @onSubmit="onSubmit"
            @onCancel="onCancel"
            :default-model="selectModel"
          ></r-form>
        </el-dialog>

        <r-form
          v-if="!dialog && dialogFormVisible"
          :width="formWidth"
          :label-width="formLabelWidth"
          :label-position="formLabelPosition"
          :children="formChildren"
          @onSubmit="onSubmit"
          @onCancel="onCancel"
          :default-model="selectModel"
        ></r-form>
      </div>

      <div v-show="tableVisible" class="table-content">
        <r-local-table
          ref="table"
          :filter="filter"
          :data="store.data"
          :columns="columns"
          border
          fit
          localPage
          @onClick="onClickTable"
        ></r-local-table>
      </div>
    </div>
  </div>
</template>

<script>
import RLocalTable from "@/components/Table/LocalTable";
import RServiceTable from "@/components/Table/ServiceTable";
import RForm from "@/components/Form/Form";
const statusMap = {
  LIST: "LIST",
  CREATE: "CREATE",
  EDIT: "EDIT",
  DELETE: "DELETE",
};
export default {
  mixins: [],
  components: { RLocalTable, RServiceTable, RForm },
  props: {
    title: String,
    children: Array,
    store: Object,
    dialog: Boolean,
    formLabelWidth: {
      type: String,
      default() {
        return "80px";
      },
    },
    formLabelPosition: {
      type: String,
      default() {
        return "top";
      },
    },
    formWidth: {
      type: String,
      default() {
        return "500";
      },
    },
  },
  data() {
    return {
      crud: {
        status: statusMap.LIST,
      },
      preStatus: statusMap.LIST,
      selectModel: {},
    };
  },
  computed: {
    columns() {
      const handler = {
        label: "操作",
        type: "toolbar",
        toolbar: ["EDIT", "DELETE"],
      };

      const columns = this.children.map(item => {
        return {
          label: item.label,
          name: item.name,
          type: item.type,
        };
      });
      const hasToolbar = this.children.find(item => item.type === "toolbar");

      if (!hasToolbar) {
        columns.push(handler);
      }

      return columns;
    },
    filter() {
      const filter = {
        toolbar: ["SEARCH", "CANCEL", "CREATE"],
        inline: true,
      };
      filter.children = this.children.map(item => ({
        options: item.options,
        widget: item.widget,
        name: item.name,
      }));

      return filter;
    },
    formChildren() {
      const children = this.children.map(item => ({
        widget: item.widget,
        name: item.name,
        label: item.label,
        validate: item.validate,
        options: item.options,
      }));
      return children;
    },
    dialogFormVisible() {
      const { status } = this.crud;
      return status === statusMap.CREATE || status === statusMap.EDIT;
    },
    tableVisible() {
      const { status } = this.crud;
      return status === statusMap.LIST || this.dialog;
    },
    dialogTitle() {
      let status = this.crud.status;
      if (status === statusMap.LIST) {
        status = this.preStatus;
      }
      return `${this.title}-${status}`;
    },
    targetDialogWidth() {
      const width = this.formWidth;

      return `${width}px`;
    },
  },
  watch: {
    "crud.status": {
      handler(val, old) {
        if (val !== old) {
          this.preStatus = old;
        }
      },
    },
  },
  methods: {
    dialogClose() {
      this.crud.status = statusMap.LIST;
    },
    refreshTable() {
      this.$refs.table.refreshData();
    },
    async onClickTable(type, model) {
      console.dir(type);
      if (type === statusMap.CREATE) {
        this.selectModel = {};
        this.crud.status = statusMap.CREATE;
      } else if (type === statusMap.EDIT) {
        this.selectModel = model;
        this.crud.status = statusMap.EDIT;
      } else if (type === statusMap.DELETE) {
        this.selectModel = {};
        this.crud.status = statusMap.LIST;
        await this.store.delete(model);
        this.refreshTable();
      }
    },
    /**
     * CREATE and EDIT
     */
    async onSubmit(validate, model) {
      const { status } = this.crud;
      let res;
      if (validate) {
        if (status === statusMap.CREATE) {
          res = await this.store.create(model);
        } else if (status === statusMap.EDIT) {
          res = await this.store.edit(model);
        }
        res && this.refreshTable();
      }
    },
    async onCancel() {
      this.selectModel = {};
      this.dialogClose();
      this.refreshTable();
    },
  },
};
</script>

<style></style>
