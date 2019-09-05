<template>
  <el-table-column :label="label" :align="align" :width="width">
    <template slot-scope="scope">
      <r-toolbar
        v-if="type === `toolbar`"
        :children="children"
        :ctx="scope.row"
      ></r-toolbar>
      <span v-else>{{ text(scope) }}</span>
    </template>
  </el-table-column>
</template>

<script>
import _ from "lodash";
import RToolbar from "@/components/Toolbar/Toolbar";
export default {
  components: {
    RToolbar,
  },
  props: {
    label: String,
    align: String,
    width: String,
    name: String,
    type: {
      type: String,
      default: "text",
    },
    children: Array,
  },
  methods: {
    text({ row }) {
      if (!this.name) {
        return row;
      }
      return _.get(row, this.name);
    },
  },
};
</script>

<style></style>
