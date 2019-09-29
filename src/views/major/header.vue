<template>
  <el-menu default-active="users" class="header" @select="select">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">Manager</span>
      </template>
      <el-menu-item-group>
        <span slot="title">System</span>
        <el-menu-item index="users">Users</el-menu-item>
        <el-menu-item index="roles">Roles</el-menu-item>
        <el-menu-item index="permissions">Permissions</el-menu-item>
        <el-menu-item index="permissions2">Permissions2</el-menu-item>
        <el-menu-item index="groups">Groups</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">Component</span>
      </template>
      <el-menu-item index="">Form</el-menu-item>
      <el-menu-item index="">Table</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  methods: {
    select(index, indexPath) {
      this.$router.push({ name: index }).catch(e => {});
    },
  },
};
</script>

<style lang="scss">
.header {
  height: 100%;
}
</style>
