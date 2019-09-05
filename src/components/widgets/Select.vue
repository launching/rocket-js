<template>
  <div class="r-select">
    <el-select v-model="store.value" :disabled="targetDisabled">
      <el-option
        v-for="(option, index) in targetOptions"
        :key="index"
        :label="option.label"
        :value="option.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import BaseWidget from "@/mixins/BaseWidget";
import Options from "@/mixins/Options";
export default {
  mixins: [BaseWidget, Options],
};
</script>

<style lang="scss">
.r-select {
  .el-select {
    width: 100%;
  }
}
</style>
