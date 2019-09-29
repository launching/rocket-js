<template>
  <el-table-column :label="label" :align="align" :width="width">
    <template slot-scope="scope">
      <r-toolbar
        v-if="type === `toolbar`"
        :children="children"
        :ctx="scope.row"
        @click="onClick"
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
    format: [Function],
    type: {
      type: String,
      default: "text",
    },
    children: Array,
  },
  methods: {
    text({ row }) {
      if (!this.name) {
        return this.format ? this.format(row) : row;
      }
      return _.get(row, this.name);
    },
    onClick(...args) {
      this.$emit("onClick", ...args);
    },
  },
};
</script>

<style></style>
