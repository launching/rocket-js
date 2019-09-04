<template>
  <div class="r-table">
    <r-form
      v-if="filter"
      v-bind="targetFilter"
      ref="filter"
      @onSearch="search"
      @onCancel="search"
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
        v-for="(column, $index) in columns"
        :key="$index"
        v-bind="column"
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
      if (!this.filter.toolbar) {
        return {
          ...this.filter,
          size: "small",
          toolbar: [
            {
              icon: "el-icon-search",
              type: "primary",
              text: "搜索",
              action: "SEARCH",
            },
            {
              text: "清空",
              action: "CANCEL",
            },
          ],
        };
      }
      return this.filter;
    },
    targetData() {
      return [];
    },
  },
  methods: {
    search(params, page) {},
  },
};
</script>

<style></style>
