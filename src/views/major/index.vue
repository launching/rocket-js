<template>
  <el-container class="major">
    <el-aside width="200px">
      <r-v-header></r-v-header>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import RVHeader from "./header";
export default {
  components: {
    RVHeader,
  },
};
</script>

<style lang="scss">
.major {
  height: 100%;
}
</style>
