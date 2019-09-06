<template>
  <div class="r-table">
    <r-form
      v-if="filter"
      v-bind="targetFilter"
      ref="filter"
      @onSearch="search"
      @onCancel="search"
      @onClick="formClick"
    >
    </r-form>
    <el-table
      :data="targetData"
      :border="border"
      :fit="fit"
      :highlight-current-row="hightlightCurrentRow"
      v-loading="loading"
    >
      <r-base-column
        v-for="(column, $index) in targetColumns"
        :key="$index"
        v-bind="column"
        @onClick="columnClick"
      ></r-base-column>
    </el-table>
    <div class="pagination-container" v-if="localPage">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="pagination.pageSize"
        background
        :total.sync="total"
        :current-page.sync="pagination.page"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import RForm from "@/components/Form/Form.vue";
import RBaseColumn from "@/components/Table/Column/BaseColumn.vue";
import { filterToolbarMap } from "@/common/constants/table";
import _ from "lodash";
export default {
  components: {
    RForm,
    RBaseColumn,
  },
  props: {
    filter: Object,
    columns: Array,
    data: {
      type: [Function, Array],
      default() {
        return [];
      },
    },
    border: Boolean,
    localPage: Boolean,
    hightlightCurrentRow: Boolean,
    fit: Boolean,
  },
  data() {
    return {
      pagination: {
        pageSize: 10,
        page: 1,
      },
      loading: false,
      filterData: {},
    };
  },
  computed: {
    totalData() {
      return [];
    },
    targetFilter() {
      if (!this.filter) return {};
      let originToolbar = [];
      if (!this.filter.toolbar) {
        originToolbar = ["SEARCH", "CANCEL"];
      } else {
        originToolbar = this.filter.toolbar;
      }

      const toolbar = [];
      originToolbar.forEach(item => {
        if (_.isString(item)) {
          toolbar.push(filterToolbarMap[item]);
        } else {
          toolbar.push(item);
        }
      });
      return {
        ...this.filter,
        size: "small",
        toolbar,
      };
    },
    targetColumns() {
      return this.columns.map(column => {
        let children = [];
        if (column.toolbar) {
          column.type = column.type || "toolbar";
          children = column.toolbar.map(item => {
            let temp = _.isString(item) ? filterToolbarMap[item] : item;
            return {
              ...temp,
              size: "small",
            };
          });
        }
        return { ...column, children };
      });
    },
    targetData() {
      return [];
    },
  },
  methods: {
    refresh() {},
    search(params, page) {},
    formClick(type, model) {
      if (type === "SEARCH" || type === "CANCEL") {
        this.search();
      } else {
        this.$emit(`onClick`, type, model);
      }
    },
    columnClick(btnOption, model) {
      this.$emit("onClick", btnOption.action, model);
    },
  },
};
</script>

<style></style>
