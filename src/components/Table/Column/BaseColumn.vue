<template>
  <el-table-column :label="label" :align="align" :width="width">
    <template slot-scope="scope">
      <span>{{ text(scope) }}</span>
    </template>
  </el-table-column>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    label: String,
    align: String,
    width: String,
    name: String,
    type: String,
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
